import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { EventName } from '../../../../core/event-name.enum';
import { finishLoadComponentHandler } from '../../post-messages-handlers/finish-load-component.handler';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../headless-checkout';

export class QrCodeComponent extends SecureComponentAbstract {
  protected componentName = 'qr-code';
  private readonly headlessCheckout: HeadlessCheckout;

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  protected connectedCallback(): void {
    this.startLoadingComponentHandler();

    this.headlessCheckout.events.onCoreEvent(
      EventName.finishLoadComponent,
      finishLoadComponentHandler,
      () => this.finishLoadingComponentHandler('qr-code'),
    );

    super.connectedCallback();
  }

  protected getHtml(): string {
    return this.getSecureHtml();
  }
}
