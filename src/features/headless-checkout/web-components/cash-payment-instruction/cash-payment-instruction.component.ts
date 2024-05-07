import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { EventName } from '../../../../core/event-name.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { Message } from '../../../../core/message.interface';
import { getCashPaymentDataHandler } from '../../post-messages-handlers/get-cash-payment-data/get-cash-payment-data.handler';
import { CashPaymentData } from '../../../../core/cash-payment-data.interface';
import { CashPaymentType } from './cash-payment.type';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';

export class CashPaymentInstructionComponent extends WebComponentAbstract {
  private readonly formSpy: FormSpy;
  private readonly postMessagesClient: PostMessagesClient;
  private cashPaymentData?: CashPaymentData | null;
  public constructor() {
    super();
    this.formSpy = container.resolve(FormSpy);
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    void this.getCashPaymentData().then(this.configLoadedHandler);
  }

  protected getHtml(): string {
    if (this.cashPaymentData?.isCashPaymentMethod) {
      return '';
    }

    return `<${WebComponentTagName.XsollaNumberComponent}></${WebComponentTagName.XsollaNumberComponent}>`;
  }

  private async getCashPaymentData(): Promise<CashPaymentType> {
    const msg: Message = {
      name: EventName.getCashPaymentData,
    };

    return this.postMessagesClient.send<CashPaymentType>(
      msg,
      getCashPaymentDataHandler,
    ) as Promise<CashPaymentType>;
  }

  private readonly configLoadedHandler = (
    cashPaymentData: CashPaymentType,
  ): void => {
    this.cashPaymentData = cashPaymentData;
    super.render();
  };
}
