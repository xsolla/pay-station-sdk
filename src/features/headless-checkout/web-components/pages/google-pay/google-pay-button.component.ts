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
import { finishLoadComponentHandler } from '../../../post-messages-handlers/finish-load-component.handler';
import { LoggerService } from '../../../../../core/exception-handling/logger.service';
import { PostMessagesClient } from '../../../../../core/post-messages-client/post-messages-client';
import { formLoadedHandler } from '../../payment-form/form-loaded.handler';

export class GooglePayButtonComponent extends SecureComponentAbstract {
  protected componentName = 'pages/google-pay-button';
  private buttonColor: GooglePayButtonColorType = 'default';

  private readonly headlessCheckout: HeadlessCheckout;
  private readonly postMessagesClient: PostMessagesClient;
  private readonly formSpy: FormSpy;
  private readonly loggerService: LoggerService;

  private readonly subscriptions: Array<() => void> = [];
  private formLoadStartTime: number | null = null;

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.formSpy = container.resolve(FormSpy);
    this.loggerService = container.resolve(LoggerService);

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayButtonClicked,
        googlePayButtonClickedHandler,
        () => {
          this.loggerService.info(
            `Google Pay - ${EventName.googlePayButtonClicked}`,
          );
          this.dispatchEvent(new CustomEvent(EventName.googlePayButtonClicked));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayWindowOpened,
        googlePayWindowOpenedHandler,
        () => {
          this.loggerService.info(
            `Google Pay - ${EventName.googlePayWindowOpened}`,
          );
          this.dispatchEvent(new CustomEvent(EventName.googlePayWindowOpened));
        },
      ),
    );

    this.subscriptions.push(
      this.headlessCheckout.events.onCoreEvent(
        EventName.googlePayWindowClosed,
        googlePayWindowClosedHandler,
        () => {
          this.loggerService.info(
            `Google Pay - ${EventName.googlePayWindowClosed}`,
          );
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
            this.loggerService.error('googlePayError', {
              error: this.serializeError(res?.error),
            });

            this.dispatchEvent(
              new CustomEvent(EventName.googlePayError, {
                detail: { error: res.error },
              }),
            );
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
            this.sendFormLoadedEvent();
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

    this.formLoadStartTime = Date.now();
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

  private sendFormLoadedEvent(): void {
    if (!this.formLoadStartTime) {
      return;
    }

    const renderTime = Date.now() - this.formLoadStartTime;
    this.formLoadStartTime = null;

    this.loggerService.info(`Google Pay - form loaded`);

    void this.postMessagesClient.send(
      {
        name: EventName.formLoaded,
        data: { renderTime },
      },
      formLoadedHandler,
    );
  }

  private serializeError(error: unknown): unknown {
    if (error instanceof Error) {
      return {
        name: error.name,
        stack: error.stack,
        message: error.message,
      };
    }

    if (typeof error === 'object') {
      return { message: JSON.stringify(error) };
    }

    return { message: String(error) };
  }
}
