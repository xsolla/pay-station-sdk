import { OtelLoggerService } from './services/otel-logger.service';
import { OtelTracerService } from './services/otel-tracer.service';
import { container, injectable } from 'tsyringe';
import { LoggerInterface } from '../logger.interface';
import { CommonLogAttributesService } from '../common-log-attributes/common-log-attributes.service';

@injectable()
export class OtelService implements LoggerInterface {
  private readonly otelLogger: OtelLoggerService =
    container.resolve(OtelLoggerService);
  private readonly otelTracer: OtelTracerService =
    container.resolve(OtelTracerService);
  private readonly commonLogAttributesService: CommonLogAttributesService =
    container.resolve(CommonLogAttributesService);

  public initialize(): void {
    this.otelTracer.initializeTracing();
  }

  public info(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.log('info', message, attributes);
  }

  public warn(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.log('warn', message, attributes);
  }

  public error(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.log('error', message, attributes);
  }

  private log(
    level: 'info' | 'warn' | 'error',
    message: string,
    attributes: { [key: string]: unknown },
  ): void {
    const mergedAttributes: { [key: string]: unknown } = {
      ...this.commonLogAttributesService.getAttributes(),
      ...attributes,
    };

    if (level === 'error') {
      mergedAttributes['error.type'] = 'error';
      mergedAttributes['error.message'] = message;
    }

    this.otelTracer.createLogTrace(level, message, mergedAttributes);
    void this.otelLogger.logOtlp(level, message, mergedAttributes);
  }
}
