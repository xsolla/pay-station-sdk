import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { container } from 'tsyringe';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';
import { getUserBalanceValueHandler } from '../../post-messages-handlers/get-user-balance-value.handler';
import { UserBalanceType } from './user-balance.type';
import { getUserBalanceTemplate } from './user-balance.template';
import { UserBalanceAttributes } from './user-balance-attributes.enum';

export class UserBalanceComponent extends WebComponentAbstract {
  private readonly postMessagesClient: PostMessagesClient;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private balance?: UserBalanceType;

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    void this.getUserBalanceValue().then(this.configLoadedHandler);
  }

  protected async getUserBalanceValue(): Promise<UserBalanceType> {
    const msg: Message = {
      name: EventName.getUserBalanceValue,
    };

    return this.postMessagesClient.send<UserBalanceType>(
      msg,
      getUserBalanceValueHandler,
    ) as Promise<UserBalanceType>;
  }

  protected getHtml(): string {
    return getUserBalanceTemplate(this.balance, this.noBalanceTemplate);
  }

  private get noBalanceTemplate(): string {
    return this.getAttribute(UserBalanceAttributes.noBalance) ?? '';
  }

  private readonly configLoadedHandler = (balance: UserBalanceType): void => {
    this.balance = balance;
    super.render();
  };
}
