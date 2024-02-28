import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { EventName } from '../../../../core/event-name.enum';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../headless-checkout';
import { applePayErrorHandler } from '../../post-messages-handlers/apple-pay/apple-pay-error.handler';
import { getApplePayComponentTemplate } from './apple-pay.template';
import { errorsHtmlWrapperClassName } from './errors-html-wrapper-classname.const';
import { applePayErrors } from './apple-pay.errors.const';
import i18next from 'i18next';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { finishLoadComponentHandler } from '../../post-messages-handlers/finish-load-component.handler';
import { headlessCheckoutAppUrl } from '../../environment';

export class ApplePayComponent extends SecureComponentAbstract {
  protected componentName: string | null = 'pages/apple-pay';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);

    this.headlessCheckout.events.onCoreEvent(
      EventName.applePayError,
      applePayErrorHandler,
      (res) => {
        if (res?.error) {
          this.drawError(res.error);
        }
      }
    );

    this.headlessCheckout.events.onCoreEvent(
      EventName.finishLoadComponent,
      finishLoadComponentHandler,
      (res) => {
        if (res?.fieldName && res?.fieldName === this.componentName) {
          this.finishLoadingComponentHandler(this.componentName);
        }
      }
    );
  }

  protected connectedCallback(): void {
    this.startLoadingComponentHandler();

    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    this.render();
  }

  protected getHtml(): string {
    const secureHtml = this.getSecureHtml();
    return getApplePayComponentTemplate(secureHtml);
  }

  protected getSecureHtml(): string {
    return `<iframe src='${headlessCheckoutAppUrl}/secure-components/${this
      .componentName!}' allow='payment'></iframe>`;
  }

  private drawError(error: string): void {
    const errorMessage = applePayErrors[error];
    if (!errorMessage) {
      return;
    }
    const errorsContainer = this.querySelector(
      '.' + errorsHtmlWrapperClassName
    );
    if (!errorsContainer) {
      return;
    }
    const errorElement = document.createElement('p');
    errorElement.classList.add('apple-pay-error');
    errorElement.textContent = i18next.t(errorMessage);
    errorsContainer.append(errorElement);
  }
}
