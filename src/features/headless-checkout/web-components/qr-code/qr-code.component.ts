import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../headless-checkout';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { EventName } from '../../../../core/event-name.enum';
import { finishLoadComponentHandler } from '../../post-messages-handlers/finish-load-component.handler';

export class QrCodeComponent extends SecureComponentAbstract {
  protected componentName = 'qr-code';
  protected inputName = 'qr';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);

    this.headlessCheckout.events.onCoreEvent(
      EventName.finishLoadComponent,
      finishLoadComponentHandler,
      (res) => {
        if (res?.fieldName && res?.fieldName === this.inputName) {
          this.finishLoadingFormControlHandler(this.inputName);
        }
      },
    );
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    super.connectedCallback();
  }

  protected getHtml(): string {
    return this.getSecureHtml();
  }
}
