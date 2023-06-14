import { injectable } from 'tsyringe';
import { EventName } from '../../core/event-name.enum';
import { LocalizeService } from '../../core/i18n/localize.service';
import { Message } from '../../core/message.interface';
import { PaymentMethod } from '../../core/payment-method.interface';
import { Handler } from '../../core/post-messages-client/handler.type';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';
import { getErrorHandler } from './post-messages-handlers/error.handler';
import { getQuickMethodsHandler } from './post-messages-handlers/get-quick-methods.handler';
import { getRegularMethodsHandler } from './post-messages-handlers/get-regular-methods.handler';
import { setTokenHandler } from './post-messages-handlers/set-token.handler';
import { headlessCheckoutAppUrl } from './variables';
import { webComponents } from '../../core/web-components/web-components.map';
import { SavedMethod } from '../../core/saved-method.interface';
import { getSavedMethodsHandler } from './post-messages-handlers/get-saved-methods.handler';
import { UserBalance } from '../../core/user-balance.interface';
import { getUserBalanceHandler } from './post-messages-handlers/get-user-balance.handler';

@injectable()
export class HeadlessCheckout {
  public events = {
    /**
     * Send public message
     * @param msg Message to send
     * @param handler Handler to process response data
     * @returns promise that will be resolved once response is recieved
     */
    send: async <T>(msg: Message, handler: Handler<T>): Promise<T | void> => {
      return this.postMessagesClient.send<T>(msg, handler);
    },

    /**
     * Add core event listener
     * @param eventName Name of event to listen
     * @param handler Handler to process response data
     * @param callback Callback for event
     * @return {Function} function to remove listener
     */
    onCoreEvent: <T>(
      eventName: EventName,
      handler: Handler<T>,
      callback: (value?: T) => void
    ): (() => void) => {
      return this.postMessagesClient.listen(eventName, handler, callback);
    },
  };

  private isWebView?: boolean;
  private coreIframe!: HTMLIFrameElement;
  private errorsSubscription?: () => void;
  private readonly headlessAppUrl = headlessCheckoutAppUrl;

  public constructor(
    private readonly window: Window,
    private readonly postMessagesClient: PostMessagesClient,
    private readonly localizeService: LocalizeService
  ) {}

  public async init(environment: { isWebview: boolean }): Promise<void> {
    this.isWebView = environment.isWebview;

    await this.localizeService.initDictionaries();

    await this.setupCoreIframe();
    this.defineComponents();

    this.postMessagesClient.init(this.coreIframe, this.headlessAppUrl);
    this.errorsSubscription = this.postMessagesClient.listen<string>(
      EventName.error,
      getErrorHandler,
      (error) => {
        throw new Error(error);
      }
    );
  }

  public destroy(): void {
    this.destroyCoreIframe();
    this.errorsSubscription?.();
  }

  public async setToken(token: string): Promise<void> {
    if (!token) {
      throw new Error('Need correct token');
    }

    const msg: Message = {
      name: EventName.initPayment,
      data: {
        configuration: {
          token,
          isWebView: this.isWebView,
        },
      },
    };

    return this.postMessagesClient.send<void>(msg, setTokenHandler);
  }

  /**
   * Returns available payment methods except quick methods
   * @param country Country that quick methods should be loaded for.
   *  Country from token is used by default
   * @returns promise that returns payment methods
   */
  public async getRegularMethods(country?: string): Promise<PaymentMethod[]> {
    const msg: Message = {
      name: EventName.getPaymentMethodsList,
      data: {
        country,
      },
    };

    return this.postMessagesClient.send<PaymentMethod[]>(
      msg,
      getRegularMethodsHandler
    ) as Promise<PaymentMethod[]>;
  }

  /**
   * Returns available quick payment methods like ApplePay, GooglePay, etc.
   * @param country Country that quick methods should be loaded for.
   *  Country from token is used by default
   * @returns promise that returns payment methods
   */
  public async getQuickMethods(country?: string): Promise<PaymentMethod[]> {
    const msg: Message = {
      name: EventName.getPaymentQuickMethods,
      data: {
        country,
      },
    };

    return this.postMessagesClient.send<PaymentMethod[]>(
      msg,
      getQuickMethodsHandler
    ) as Promise<PaymentMethod[]>;
  }

  public async getSavedMethods(): Promise<SavedMethod[]> {
    const msg: Message = {
      name: EventName.getSavedMethods,
    };

    return this.postMessagesClient.send<SavedMethod[]>(
      msg,
      getSavedMethodsHandler
    ) as Promise<SavedMethod[]>;
  }

  public async getUserBalance(): Promise<UserBalance> {
    const msg: Message = {
      name: EventName.getUserBalance,
    };

    return this.postMessagesClient.send<UserBalance>(
      msg,
      getUserBalanceHandler
    ) as Promise<UserBalance>;
  }

  private async setupCoreIframe(): Promise<void> {
    this.coreIframe = this.window.document.createElement('iframe');
    this.coreIframe.width = '0px';
    this.coreIframe.height = '0px';
    this.coreIframe.style.border = 'none';
    this.coreIframe.style.position = 'absolute';
    this.coreIframe.src = `${this.headlessAppUrl}/core`;
    this.window.document.body.appendChild(this.coreIframe);
    return new Promise((resolve) => {
      this.coreIframe.onload = () => {
        resolve();
      };
    });
  }

  private destroyCoreIframe(): void {
    this.coreIframe.remove();
  }

  private defineComponents(): void {
    Object.entries(webComponents).forEach(([tagName, component]) => {
      if (this.window.customElements.get(tagName)) {
        return;
      }

      this.window.customElements.define(tagName, component);
    });
  }
}
