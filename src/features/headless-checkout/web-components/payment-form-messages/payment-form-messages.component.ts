import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { HeadlessCheckout } from '../../headless-checkout';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { container } from 'tsyringe';
import { EventName } from '../../../../core/event-name.enum';
import { getFormMessagesHandler } from '../../post-messages-handlers/get-form-messages.handler';
import { getPaymentFormMessagesTemplate } from './payment-form-messages.template';
import './payment-form-messages.component.scss';

export class PaymentFormMessagesComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private messages?: string[];

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    void this.headlessCheckout.events.onCoreEvent(
      EventName.formMessagesChanged,
      getFormMessagesHandler,
      (messages) => this.messagesLoadedHandler(messages),
    );
  }

  protected getHtml(): string {
    if (!this.messages) {
      return '';
    }
    return getPaymentFormMessagesTemplate(this.messages);
  }

  private readonly messagesLoadedHandler = (messages?: string[]): void => {
    if (!messages) {
      return;
    }
    this.messages = messages;

    this.render();
  };
}
