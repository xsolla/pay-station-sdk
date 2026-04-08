import { container, injectable } from 'tsyringe';
import { EnvironmentService } from '../../environment/environment.service';
import { CommonLogAttributesService } from '../common-log-attributes/common-log-attributes.service';
import { ErrorTags } from './elk-error-types.enum';
import { LogMessage } from './log-message.interface';
import { LoggerInterface } from '../logger.interface';
import { CommonLogAttributes } from '../common-log-attributes/common-log-attributes.interface';

@injectable()
export class ElkLoggerService implements LoggerInterface {
  private readonly commonLogAttributesService: CommonLogAttributesService =
    container.resolve(CommonLogAttributesService);
  private readonly environmentService: EnvironmentService =
    container.resolve(EnvironmentService);

  public info(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.log(message, [ErrorTags.INFO], attributes);
  }

  public warn(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.log(message, [ErrorTags.WARN], attributes);
  }

  public error(
    message: string,
    attributes: { [key: string]: unknown } = {},
  ): void {
    this.log(message, [ErrorTags.ERROR], attributes);
  }

  private log(
    message: string,
    tags: ErrorTags[],
    extra?: { [key: string]: unknown },
  ): void {
    const logTags = [ErrorTags.PAY_STATION_SDK, ...tags];

    const logMessage: LogMessage = {
      additionalInfo: this.getAdditionalInfo(),
      extra,
      message,
    };

    void this.sendLog(logMessage, logTags);
  }

  private getAdditionalInfo(): CommonLogAttributes {
    return this.commonLogAttributesService.getAttributes();
  }

  private async sendLog(message: LogMessage, tags: ErrorTags[]): Promise<void> {
    const url = `${this.environmentService.elkUrl}/tag/${tags.join(',')}`;

    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } catch (error: unknown) {
      console.error('Elk Logger: request error', error);
    }
  }
}
