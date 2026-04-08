import { container, injectable } from 'tsyringe';
import api, { Span, Tracer, SpanStatusCode } from '@opentelemetry/api';
import * as exporter from '@opentelemetry/exporter-trace-otlp-http';
import * as resources from '@opentelemetry/resources';
import * as sdkTraceWeb from '@opentelemetry/sdk-trace-web';
import * as instrumentation from '@opentelemetry/instrumentation';
import * as instrumentationDocumentLoad from '@opentelemetry/instrumentation-document-load';
import * as instrumentationFetch from '@opentelemetry/instrumentation-fetch';
import * as instrumentationXhr from '@opentelemetry/instrumentation-xml-http-request';
import { EnvironmentService } from '../../../environment/environment.service';
import { getOtelEnvironmentName } from './otel-environment-map.const';
import { CommonLogAttributesService } from '../../common-log-attributes/common-log-attributes.service';

@injectable()
export class OtelTracerService {
  private readonly environmentService: EnvironmentService =
    container.resolve(EnvironmentService);
  private readonly commonLogAttributesService: CommonLogAttributesService =
    container.resolve(CommonLogAttributesService);

  private tracer: Tracer | null = null;
  private readonly OTEL_SCOPE = 'logger';
  private readonly traceUrl = `${this.environmentService.otelCollectorUrl}/traces`;

  public initializeTracing(): void {
    try {
      this.tracer = api.trace.getTracer(this.OTEL_SCOPE);

      const otelExporter = new exporter.OTLPTraceExporter({
        url: this.traceUrl,
        headers: {
          Authorization: `Bearer ${this.environmentService.otelCollectorToken}`,
        },
      });

      const resource = resources.resourceFromAttributes({
        'service.name': this.environmentService.otelCollectorServiceName,
        'deployment.environment': getOtelEnvironmentName(),
      });

      const provider = new sdkTraceWeb.WebTracerProvider({
        resource,
        spanProcessors: [new sdkTraceWeb.BatchSpanProcessor(otelExporter)],
      });

      provider.register();

      instrumentation.registerInstrumentations({
        instrumentations: [
          new instrumentationDocumentLoad.DocumentLoadInstrumentation({
            applyCustomAttributesOnSpan: {
              documentLoad: this.applyCustomAttributesOnSpan,
              documentFetch: this.applyCustomAttributesOnSpan,
              resourceFetch: this.applyCustomAttributesOnSpan,
            },
          }),
          new instrumentationFetch.FetchInstrumentation({
            applyCustomAttributesOnSpan: this.applyCustomAttributesOnSpan,
            ignoreUrls: [new RegExp(this.environmentService.otelCollectorUrl)],
          }),
          new instrumentationXhr.XMLHttpRequestInstrumentation({
            applyCustomAttributesOnSpan: this.applyCustomAttributesOnSpan,
            ignoreUrls: [new RegExp(this.environmentService.otelCollectorUrl)],
          }),
        ],
      });
    } catch (error: unknown) {
      console.error('OtelTracerService: Error during initialization', error);
    }
  }

  public createLogTrace(
    level: 'info' | 'warn' | 'error',
    message: string,
    attributes: { [key: string]: unknown },
  ): { span: Span; traceId: string; spanId: string } | null {
    if (!this.tracer) {
      return null;
    }

    const ctx = api.context.active();
    const parent = api.trace.getSpan(ctx);

    const span = this.tracer.startSpan(
      `log:${level}`,
      {
        attributes: {
          'log.severity': level,
          'log.message': message,
          'service.name': this.environmentService.otelCollectorServiceName,
          'deployment.environment': getOtelEnvironmentName(),
          ...(parent && {
            'parent.trace_id': parent.spanContext().traceId,
            'parent.span_id': parent.spanContext().spanId,
          }),
          ...attributes,
        },
      },
      ctx,
    );

    span.addEvent(`log.${level}`, {
      'log.severity': level,
      'log.message': message,
      ...attributes,
    });

    if (level === 'error') {
      span.setStatus({ code: SpanStatusCode.ERROR });
    }

    let traceId = '';
    let spanId = '';

    const activeSpan = api.trace.getSpan(api.context.active());
    if (activeSpan) {
      const spanContext = activeSpan.spanContext();
      traceId = spanContext.traceId;
      spanId = spanContext.spanId;
    }

    span.end();

    return { span, traceId, spanId };
  }

  private readonly applyCustomAttributesOnSpan = (span: Span): void => {
    const attributes = this.commonLogAttributesService.getAttributes();
    for (const [key, value] of Object.entries(attributes)) {
      span.setAttribute(key, String(value));
    }
  };
}
