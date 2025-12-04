import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../headless-checkout';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { EventName } from '../../../../core/event-name.enum';
import { CashPaymentType } from '../cash-payment-instruction/cash-payment.type';
import { sendCashPaymentDataStatusHandler } from '../../post-messages-handlers/send-cash-payment-data-status/send-cash-payment-data-status.handler';
import { SendCashPaymentDataStatus } from '../../../../core/send-cash-payment-data-status.interface';
import { getNotifierTemplate } from './templates/get-notifier.template';
import { Message } from '../../../../core/message.interface';
import { isEventMessage } from '../../../../core/guards/event-message.guard';
import { CashPaymentData } from '../../../../core/cash-payment-data.interface';
import { getCashPaymentDataHandler } from '../../post-messages-handlers/get-cash-payment-data/get-cash-payment-data.handler';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { getXsollaNumberComponentTemplate } from './templates/get-xsolla-number.compontent.template';
import './xsolla-number.component.scss';
import { SendButtonStatus } from './send-button-status.interface';

export class XsollaNumberComponent extends SecureComponentAbstract {
  protected componentName = 'xsolla-number';
  protected inputName = 'xsolla-number';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;
  private cashPaymentData?: CashPaymentData | null;
  private readonly window: Window;
  private readonly postMessagesClient: PostMessagesClient;
  private isLoading = false;

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);
    this.window = container.resolve(Window);
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    void this.getCashPaymentData().then(this.configLoadedHandler);
  }

  protected async getCashPaymentData(): Promise<CashPaymentType> {
    const msg: Message = {
      name: EventName.getCashPaymentData,
    };

    return this.postMessagesClient.send<CashPaymentType>(
      msg,
      getCashPaymentDataHandler,
    ) as Promise<CashPaymentType>;
  }

  protected getHtml(): string {
    const appUrl = this.environmentService.getHeadlessCheckoutAppUrl();
    const emailControl = `<iframe src='${appUrl}/secure-components/xsolla-number/email'></iframe>`;
    const phoneControl = `<iframe src='${appUrl}/secure-components/xsolla-number/phone'></iframe>`;
    const title = this.cashPaymentData?.title;
    const userName = this.cashPaymentData?.publicId;
    const xsollaNumber = this.cashPaymentData?.xsollaNumber;
    const printUrl = this.cashPaymentData?.printUrl;
    const projectName = this.cashPaymentData?.projectName;
    return getXsollaNumberComponentTemplate({
      emailControl,
      phoneControl,
      userName,
      paymentMethod: title,
      xsollaNumber,
      printUrl,
      projectName,
    });
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();
    this.window.removeEventListener('message', this.changeButtonStatusCallback);
  }

  private readonly configLoadedHandler = (
    cashPaymentData: CashPaymentType,
  ): void => {
    this.cashPaymentData = cashPaymentData;
    super.render();
    void this.headlessCheckout.events.onCoreEvent(
      EventName.sendCashPaymentDataStatus,
      sendCashPaymentDataStatusHandler,
      (status) => this.sendPaymentInstructionStatusCallback(status),
    );
    this.listenSendButtonsStatusChange();
    this.listenComponentsClicks();
  };

  private listenComponentsClicks(): void {
    this.addEventListenerToElement(this, 'click', (event) => {
      switch ((event.target as HTMLElement).id) {
        case 'send-email':
          if (this.isLoading) {
            return;
          }
          this.setupLoading('email', true);
          void this.sendPaymentInstruction('email');
          break;
        case 'send-sms':
          if (this.isLoading) {
            return;
          }
          this.setupLoading('phone', true);
          void this.sendPaymentInstruction('phone');
          break;
        case 'close-notification':
          void this.closeNotification();
          break;
        case 'phone-recipient-button':
          this.querySelector('.phone-control-wrapper')!.classList.add(
            'active-control',
          );
          this.querySelector('.email-control-wrapper')!.classList.remove(
            'active-control',
          );
          break;
        case 'email-recipient-button':
          this.querySelector('.phone-control-wrapper')!.classList.remove(
            'active-control',
          );
          this.querySelector('.email-control-wrapper')!.classList.add(
            'active-control',
          );
          break;
      }
    });
  }

  private setupLoading(
    channelType: 'phone' | 'email',
    isLoading: boolean,
  ): void {
    this.isLoading = isLoading;
    const button = this.querySelector(
      `#send-${channelType === 'phone' ? 'sms' : channelType}`,
    );
    if (!button) {
      return;
    }

    if (isLoading) {
      button.classList.add('is-loading');
      return;
    }
    button.classList.remove('is-loading');
  }

  private readonly sendPaymentInstructionStatusCallback = (
    status?: SendCashPaymentDataStatus | null,
  ): void => {
    if (!status) {
      return;
    }

    this.showNotification(status);
    this.setupLoading(status.type === 'sms' ? 'phone' : 'email', false);
  };

  private sendPaymentInstruction(channelType: 'phone' | 'email'): void {
    const recipient = this.querySelector(
      `#${channelType}-recipient-container  iframe`,
    )!;

    if (!recipient) {
      return;
    }
    const msg: Message<{ channelType: 'phone' | 'email' }> = {
      name: EventName.sendCashPaymentData,
      data: {
        channelType: channelType,
      },
    };

    return (recipient as HTMLIFrameElement).contentWindow?.postMessage(
      JSON.stringify(msg),
      (recipient as HTMLIFrameElement)?.src,
    );
  }

  private listenSendButtonsStatusChange(): void {
    this.window.addEventListener('message', this.changeButtonStatusCallback);
  }

  private readonly changeButtonStatusCallback = (
    message: MessageEvent,
  ): void => {
    const messageData = this.getJsonOrNull(message?.data);
    if (
      !messageData ||
      !isEventMessage(messageData) ||
      messageData.name !== EventName.sendCashPaymentButtonStatus
    ) {
      return;
    }
    const data = messageData.data as SendButtonStatus;
    this.setupSendButtonsDisabled(data);
  };

  private setupSendButtonsDisabled(data: SendButtonStatus): void {
    if (data.channelType === 'email') {
      (this.querySelector('#send-email')! as HTMLButtonElement).disabled =
        data.isDisabled;
    }
    if (data.channelType === 'phone') {
      (this.querySelector('#send-sms')! as HTMLButtonElement).disabled =
        data.isDisabled;
    }
  }

  private showNotification(status: SendCashPaymentDataStatus): void {
    const notifierContainer = this.querySelector('#send-status-container')!;

    notifierContainer.innerHTML = getNotifierTemplate(status);
  }

  private closeNotification(): void {
    const notifierContainer = this.querySelector('#send-status-container')!;
    notifierContainer.innerHTML = '';
  }
}
