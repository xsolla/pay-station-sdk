import { getOtelEnvironmentName } from './otel-environment-map.const';
import { container, injectable } from 'tsyringe';
import { EnvironmentService } from '../../../environment/environment.service';

@injectable()
export class OtelLoggerService {
  private readonly environmentService: EnvironmentService =
    container.resolve(EnvironmentService);

  private readonly MILLISECONDS_TO_NANOSECONDS = 1e6;
  private readonly OTEL_SCOPE = 'logger';
  private readonly logUrl = `${this.environmentService.otelCollectorUrl}/logs`;

  public async logOtlp(
    level: 'info' | 'warn' | 'error',
    message: string,
    attributes: { [key: string]: unknown },
  ): Promise<void> {
    const payload = {
      resourceLogs: [
        {
          resource: {
            attributes: [
              {
                key: 'service.name',
                value: {
                  stringValue: this.environmentService.otelCollectorServiceName,
                },
              },
              {
                key: 'deployment.environment',
                value: {
                  stringValue: getOtelEnvironmentName(),
                },
              },
            ],
          },
          scopeLogs: [
            {
              scope: { name: this.OTEL_SCOPE },
              logRecords: [
                {
                  timeUnixNano: Date.now() * this.MILLISECONDS_TO_NANOSECONDS,
                  severityText: level.toUpperCase(),
                  body: { stringValue: message },
                  attributes: Object.entries(attributes).map(([key, val]) => ({
                    key,
                    value: { stringValue: String(val) },
                  })),
                },
              ],
            },
          ],
        },
      ],
    };

    try {
      await fetch(this.logUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.environmentService.otelCollectorToken}`,
        },
      });
    } catch (error: unknown) {
      console.error('OtelService log failed', error);
    }
  }
}
