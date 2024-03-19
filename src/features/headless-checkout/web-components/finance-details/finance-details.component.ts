import { EventName } from '../../../../core/event-name.enum';
import { container } from 'tsyringe';
import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { HeadlessCheckout } from '../../headless-checkout';
import { getFinanceDetailsHandler } from '../../post-messages-handlers/get-finance-details.handler';
import { getFinanceDetailsTemplate } from './finance-details.template';
import './finance-details.component.scss';

export class FinanceDetailsComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private financeDetails?: FinanceDetails | null = null;

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
      EventName.financeDetails,
      getFinanceDetailsHandler,
      (financeDetails) => this.financeDetailsLoadedHandler(financeDetails),
    );
  }

  protected getHtml(): string {
    if (this.financeDetails) {
      return getFinanceDetailsTemplate(this.financeDetails);
    }

    return '';
  }

  private readonly financeDetailsLoadedHandler = (
    financeDetails?: FinanceDetails | null,
  ): void => {
    this.financeDetails = financeDetails;

    this.render();
  };
}
