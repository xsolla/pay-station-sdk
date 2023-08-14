import { container } from 'tsyringe';
import i18next from 'i18next';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { Status } from '../../../../core/status/status.interface';
import { StatusEnum } from '../../../../core/status/status.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { getStatusComponentTemplate } from './status.component.template';
import { StatusComponentConfig } from './status.component.config.interface';
import successImage from '../../../../assets/statuses/success.png';
import failedImage from '../../../../assets/statuses/failed.png';

export class StatusComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;

  private statusConfig: StatusComponentConfig | null = null;

  public constructor() {
    super();

    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  protected connectedCallback(): void {
    void this.getStatus();

    this.headlessCheckout.form.onNextAction((nextAction) => {
      if (nextAction.type === 'status_updated') {
        void this.getStatus();
      }
    });
  }

  protected getHtml(): string {
    if (this.statusConfig) {
      return getStatusComponentTemplate(this.statusConfig);
    }

    return '';
  }

  private statusLoadedHandler(
    statusConfig: StatusComponentConfig | null
  ): void {
    this.statusConfig = statusConfig;

    this.render();
  }

  private async getStatus(): Promise<void> {
    const status = await this.headlessCheckout.getStatus();

    const statusConfig = this.getStatusConfig(status);

    this.statusLoadedHandler(statusConfig);
  }

  private getStatusConfig(status: Status): StatusComponentConfig | null {
    if (!status) {
      return null;
    }

    const isProcessing = [
      StatusEnum.processing,
      StatusEnum.created,
      StatusEnum.held,
    ].includes(status.statusState);
    const isError =
      [StatusEnum.canceled, StatusEnum.error].includes(status.statusState) ||
      status.isCancelUser;
    const isSuccess =
      status.statusState === StatusEnum.done ??
      status.statusState === StatusEnum.authorized;

    if (isProcessing) {
      return {
        image: null,
        title: i18next.t('status.processing.title'),
        description: i18next.t('status.processing.description'),
        showDescription: true,
      };
    }

    if (isError) {
      return {
        image: failedImage,
        title: i18next.t('status.error.title'),
        description: '',
        showDescription: false,
      };
    }

    if (isSuccess) {
      return {
        image: successImage,
        title: i18next.t('status.success.title'),
        description: i18next.t('status.success.description', {
          email: status.email,
        }),
        showDescription: !!status.email,
      };
    }

    return null;
  }
}
