import { injectable } from 'tsyringe';
import { PaymentMethod } from '../../core/payment-method.interface';
import { EventName } from '../../core/post-messages-client/event-name.enum';
import { Message } from '../../core/post-messages-client/message.interface';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';
import { Localize } from '../../core/i18n/localize';
import { getQuickMethodsHandler } from './post-messages-handlers/get-quick-methods.handler';
import { getRegularMethodsHandler } from './post-messages-handlers/get-regular-methods.handler';
import { setTokenHandler } from './post-messages-handlers/set-token.handler';
import { headlessCheckoutAppUrl } from './variables';

@injectable()
export class HeadlessCheckout {
  private isWebView?: boolean;
  private coreIframe!: HTMLIFrameElement;
  private readonly headlessAppUrl = headlessCheckoutAppUrl;

  public constructor(
    private readonly window: Window,
    private readonly postMessagesClient: PostMessagesClient,
    private readonly localize: Localize
  ) {}

  public async init(environment: { isWebview: boolean }): Promise<void> {
    this.isWebView = environment.isWebview;

    await this.setupCoreIframe();

    await this.localize.initDictionaries();

    this.postMessagesClient.init(this.coreIframe, this.headlessAppUrl);
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

  private async setupCoreIframe(): Promise<void> {
    this.coreIframe = this.window.document.createElement('iframe');
    this.coreIframe.src = `${this.headlessAppUrl}/core`;
    this.window.document.body.appendChild(this.coreIframe);
    return new Promise((resolve) => {
      this.coreIframe.onload = () => {
        resolve();
      };
    });
  }
}
