import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { isStatusUpdatedAction } from '../../../../core/actions/is-status-updated-action.function';
import { StatusUpdatedAction } from '../../../../core/actions/status-updated.action.type';
import { Status } from '../../../../core/status/status.interface';
import { HeadlessCheckout } from '../../headless-checkout';
import { getStatusComponentTemplate } from './status.component.template';
import { StatusComponentConfig } from './template-config/status.component.config.interface';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { getPaymentStatusConfig } from './template-config/get-payment-status-config.function';
import { getSavingMethodStatusConfig } from './template-config/get-saving-method-status-config.function';
import { getStatusState } from './template-config/get-status-state.function';
import './status.component.scss';

export class StatusComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private statusConfig: StatusComponentConfig | null = null;
  private prevStatusUpdate: StatusUpdatedAction | null = null;

  public constructor() {
    super();

    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    void this.getStatus();
    this.listenFormInit();
  }

  protected getHtml(): string {
    if (this.statusConfig) {
      return getStatusComponentTemplate(this.statusConfig);
    }

    return '';
  }

  private listenFormInit(): void {
    this.headlessCheckout.form.onNextAction((nextAction) => {
      if (
        isStatusUpdatedAction(nextAction) &&
        nextAction.data.statusState !== this.prevStatusUpdate?.data?.statusState
      ) {
        this.prevStatusUpdate = nextAction;

        void this.getStatus();
      }
    });
  }

  private statusLoadedHandler(
    statusConfig: StatusComponentConfig | null,
  ): void {
    this.statusConfig = statusConfig;

    this.render();
  }

  private async getStatus(): Promise<void> {
    const status = await this.headlessCheckout.getStatus();

    const statusConfig = this.getStatusConfig(status);
    this.statusLoadedHandler(statusConfig);
  }

  private getStatusConfig(status: Status | null): StatusComponentConfig | null {
    if (!status) {
      return null;
    }

    const statusState = getStatusState(status);

    if (!statusState) {
      return null;
    }

    if (status.isSavePaymentAccount) {
      return getSavingMethodStatusConfig(statusState, status);
    }
    return getPaymentStatusConfig(statusState, status);
  }
}
