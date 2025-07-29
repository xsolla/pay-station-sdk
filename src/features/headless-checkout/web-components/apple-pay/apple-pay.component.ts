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
import { openApplePayPageHandler } from '../../post-messages-handlers/apple-pay/open-apple-pay-page.handler';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { getWaitingProcessingTemplate } from './waiting-processing.template';
import { waitingProcessingClassname } from './waiting-processing-classname.const';
import { applePayButtonClassName } from './apple-pay-button-classname.const';
import './apple-pay.component.scss';
import { applePayQrClosedHandler } from '../../post-messages-handlers/apple-pay/apple-pay-qr-closed.handler';
import { applePayQrOpenedHandler } from '../../post-messages-handlers/apple-pay/apple-pay-qr-opened.handler';
import { closeExternalWindowHandler } from '../../post-messages-handlers/close-external-window.handler';

export class ApplePayComponent extends SecureComponentAbstract {
  protected componentName: string | null = 'pages/apple-pay';
  private readonly applePayWindowName = 'HeadlessCheckout_PayStation_ApplePay';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly postMessagesClient: PostMessagesClient;
  private readonly formSpy: FormSpy;
  private readonly window: Window;
  private applePayWindow?: Window | null;
  private readonly subscriptions: Array<() => void> = [];

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.formSpy = container.resolve(FormSpy);
    this.window = container.resolve(Window);

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.applePayError,
        applePayErrorHandler,
        (res) => {
          if (res?.error) {
            this.drawError(res.error);
          }
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.openApplePayPage,
        openApplePayPageHandler,
        (res) => {
          if (res?.redirectUrl) {
            this.openRedirectPage(res.redirectUrl);
          }
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.finishLoadComponent,
        finishLoadComponentHandler,
        (res) => {
          if (res?.fieldName && res?.fieldName === this.componentName) {
            this.finishLoadingComponentHandler(this.componentName);
          }
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.applePayQrClosed,
        applePayQrClosedHandler,
        () => {
          this.removeStylesForQrCode();
          this.dispatchEvent(new CustomEvent(EventName.applePayQrOpened));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.applePayQrOpened,
        applePayQrOpenedHandler,
        () => {
          this.addStylesForQrCode();
          this.dispatchEvent(new CustomEvent(EventName.applePayQrOpened));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.closeExternalWindow,
        closeExternalWindowHandler,
        () => {
          this.destroyApplePayWindow();
        },
      ),
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

  protected disconnectedCallback(): void {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
  }

  protected getHtml(): string {
    const secureHtml = this.getSecureHtml();
    return getApplePayComponentTemplate(secureHtml);
  }

  protected getSecureHtml(): string {
    return `<iframe id="apple-pay-iframe" src='${headlessCheckoutAppUrl}/secure-components/${this
      .componentName!}' allow='payment'></iframe>`;
  }

  private drawError(error: string): void {
    const errorMessage = applePayErrors[error];
    if (!errorMessage) {
      return;
    }
    const errorsContainer = this.querySelector(
      '.' + errorsHtmlWrapperClassName,
    );
    if (!errorsContainer) {
      return;
    }
    const errorElement = document.createElement('p');
    errorElement.classList.add('apple-pay-error');
    errorElement.textContent = i18next.t(errorMessage);
    errorsContainer.innerHTML = '';
    errorsContainer.append(errorElement);
  }

  private setupWaitingPayment(isWaiting: boolean): void {
    if (isWaiting) {
      this.drawWaitingElement();
      this.hidePayButton();
      return;
    }
    this.removeWaitingElement();
    this.showPayButton();
  }

  private hidePayButton(): void {
    const applePayButton: HTMLElement | null = this.querySelector(
      `.${applePayButtonClassName}`,
    );
    if (applePayButton) {
      applePayButton.style.visibility = 'hidden';
      applePayButton.style.position = 'absolute';
    }
  }

  private showPayButton(): void {
    const applePayButton: HTMLElement | null = this.querySelector(
      `.${applePayButtonClassName}`,
    );
    if (applePayButton) {
      applePayButton.style.visibility = 'visible';
      applePayButton.style.position = 'static';
    }
  }

  private drawWaitingElement(): void {
    const waitingProcessingWrapper = document.createElement('div');
    waitingProcessingWrapper.classList.add(waitingProcessingClassname);
    waitingProcessingWrapper.innerHTML = getWaitingProcessingTemplate(
      i18next.t('status.processing.title'),
      i18next.t('status.processing.description'),
    );
    this.append(waitingProcessingWrapper);
  }

  private removeWaitingElement(): void {
    const waitingProcessingWrapper = this.querySelector(
      `.${waitingProcessingClassname}`,
    );
    if (waitingProcessingWrapper) {
      waitingProcessingWrapper.remove();
    }
  }

  private openRedirectPage(redirectUrl: string): void {
    this.setupWaitingPayment(true);
    this.applePayWindow = this.window.open(
      redirectUrl,
      this.applePayWindowName,
    );
  }

  private destroyApplePayWindow(stopLoading?: boolean): void {
    this.dispatchEvent(new CustomEvent(EventName.applePayWindowClosed));

    this.window.focus();
    if (this.applePayWindow && !this.applePayWindow.closed) {
      this.applePayWindow.close();
    }

    if (stopLoading) {
      this.setupWaitingPayment(false);
    }
  }

  private addStylesForQrCode(): void {
    const iframe = this.querySelector('#apple-pay-iframe');

    (iframe as HTMLElement).style.position = 'absolute';
    (iframe as HTMLElement).style.top = '0';
    (iframe as HTMLElement).style.left = '0';
  }

  private removeStylesForQrCode(): void {
    const iframe = this.querySelector('#apple-pay-iframe');

    (iframe as HTMLElement).style.removeProperty('position');
    (iframe as HTMLElement).style.removeProperty('top');
    (iframe as HTMLElement).style.removeProperty('left');
  }
}
