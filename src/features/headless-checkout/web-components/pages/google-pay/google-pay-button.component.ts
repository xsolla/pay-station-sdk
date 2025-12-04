import { SecureComponentAbstract } from '../../../../../core/web-components/secure-component/secure-component.abstract';
import { GooglePayButtonColorType } from './google-pay-button-color.type';
import { EventName } from '../../../../../core/event-name.enum';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../../headless-checkout';
import { FormSpy } from '../../../../../core/spy/form-spy/form-spy';
import { googlePayButtonClickedHandler } from '../../../post-messages-handlers/google-pay/google-pay-button-clicked.handler';
import { googlePayWindowOpenedHandler } from '../../../post-messages-handlers/google-pay/google-pay-window-opened.handler';
import { googlePayWindowClosedHandler } from '../../../post-messages-handlers/google-pay/google-pay-window-closed.handler';
import { googlePayErrorHandler } from '../../../post-messages-handlers/google-pay/google-pay-error.handler';

export class GooglePayButtonComponent extends SecureComponentAbstract {
  protected componentName = 'pages/google-pay-button';
  private buttonColor: GooglePayButtonColorType = 'default';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;
  private readonly subscriptions: Array<() => void> = [];

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayButtonClicked,
        googlePayButtonClickedHandler,
        () => {
          this.dispatchEvent(new CustomEvent(EventName.googlePayButtonClicked));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayWindowOpened,
        googlePayWindowOpenedHandler,
        () => {
          this.dispatchEvent(new CustomEvent(EventName.googlePayWindowOpened));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayWindowClosed,
        googlePayWindowClosedHandler,
        () => {
          this.dispatchEvent(new CustomEvent(EventName.googlePayWindowClosed));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayError,
        googlePayErrorHandler,
        (res) => {
          if (res?.error) {
            this.dispatchEvent(
              new CustomEvent(EventName.googlePayError, {
                detail: { error: res.error },
              }),
            );
          }
        },
      ),
    );
  }

  public setButtonColor(color: GooglePayButtonColorType): void {
    this.buttonColor = color;
  }

  protected connectedCallback(): void {
    this.startLoadingComponentHandler();

    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    this.render();
  }

  protected disconnectedCallback(): void {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
  }

  protected getHtml(): string {
    return this.getSecureHtml();
  }

  protected getSecureHtml(): string {
    const appUrl = this.environmentService.getHeadlessCheckoutAppUrl();
    return `<iframe allow='payment' src='${appUrl}/secure-components/${this.componentName}?buttonColor=${this.buttonColor}'></iframe>`;
  }
}
