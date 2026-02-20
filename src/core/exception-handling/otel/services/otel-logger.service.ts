import { container, injectable } from 'tsyringe';
import { EnvironmentService } from '../../../environment/environment.service';
import { getOtelEnvironmentName } from './otel-environment-map.const';
import { OtelAnyValue } from './otel-attribute-value.type';

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
                  attributes: this.addAttributes(attributes),
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

  private addAttributes(attributes: { [key: string]: unknown }): Array<{
    key: string;
    value: OtelAnyValue;
  }> {
    return Object.entries(attributes).map(([key, val]) => {
      return {
        key,
        value: this.convertAttributeToOtelType(val),
      };
    });
  }

  private convertAttributeToOtelType(attribute: unknown): OtelAnyValue {
    if (attribute === null || attribute === undefined) {
      return { stringValue: 'null' };
    }

    if (typeof attribute === 'string') {
      return { stringValue: attribute };
    }

    if (typeof attribute === 'boolean') {
      return { boolValue: attribute };
    }

    if (typeof attribute === 'number') {
      return Number.isInteger(attribute)
        ? { intValue: attribute }
        : { doubleValue: attribute };
    }

    if (Array.isArray(attribute)) {
      return {
        kvlistValue: {
          values: attribute.map((item, i) => ({
            key: String(i),
            value: this.convertAttributeToOtelType(item),
          })),
        },
      };
    }

    if (typeof attribute === 'object') {
      return {
        kvlistValue: {
          values: Object.entries(attribute as { [key: string]: unknown }).map(
            ([k, v]) => ({ key: k, value: this.convertAttributeToOtelType(v) }),
          ),
        },
      };
    }

    // fallback to default type
    return {
      stringValue: String(attribute),
    };
  }
}
