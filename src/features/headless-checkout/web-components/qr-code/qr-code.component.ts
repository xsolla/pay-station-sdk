import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { EventName } from '../../../../core/event-name.enum';
import { finishLoadComponentHandler } from '../../post-messages-handlers/finish-load-component.handler';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../headless-checkout';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';

export class QrCodeComponent extends SecureComponentAbstract {
  protected componentName = 'qr-code';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);
  }

  protected connectedCallback(): void {
    this.startLoadingComponentHandler();

    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
    }

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
