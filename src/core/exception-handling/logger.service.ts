import { container, injectable } from 'tsyringe';
import { ElkLoggerService } from './elk/elk-logger.service';
import { OtelService } from './otel/otel.service';
import { LoggerInterface } from './logger.interface';
import { CommonLogAttributesService } from './common-log-attributes/common-log-attributes.service';
import { CommonLogAttributes } from './common-log-attributes/common-log-attributes.interface';

@injectable()
export class LoggerService implements LoggerInterface {
  private readonly elkLoggerService: ElkLoggerService =
    container.resolve(ElkLoggerService);
  private readonly otelService: OtelService = container.resolve(OtelService);
  private readonly commonLogAttributesService = container.resolve(
    CommonLogAttributesService,
  );

  public initialize(): void {
    this.otelService.initialize();
  }

  public info(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.elkLoggerService.info(message, attributes);
    this.otelService.info(message, attributes);
  }

  public warn(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.elkLoggerService.warn(message, attributes);
    this.otelService.warn(message, attributes);
  }

  public error(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.elkLoggerService.error(message, attributes);
    this.otelService.error(message, attributes);
  }

  public setAttributes(attributes: Partial<CommonLogAttributes>): void {
    this.commonLogAttributesService.setAttributes(attributes);
  }
}
