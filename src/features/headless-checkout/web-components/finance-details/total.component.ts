import { EventName } from '../../../../core/event-name.enum';
import { container } from 'tsyringe';
import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { HeadlessCheckout } from '../../headless-checkout';
import { getFinanceDetailsHandler } from '../../post-messages-handlers/get-finance-details.handler';
import './finance-details.component.scss';
import { isEventMessage } from '../../../../core/guards/event-message.guard';
import { getTotalRowTemplate } from './total-row.template';
import './total.component.scss';

export class TotalComponent extends WebComponentAbstract {
  private readonly componentName = 'TotalComponent';
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private readonly window: Window;
  private financeDetails?: FinanceDetails | null = null;

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.window = container.resolve(Window);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    this.listenPings();

    void this.headlessCheckout.events.onCoreEvent(
      EventName.financeDetails,
      getFinanceDetailsHandler,
      (financeDetails) => this.financeDetailsLoadedHandler(financeDetails),
    );
  }

  protected getHtml(): string {
    if (this.financeDetails) {
      return getTotalRowTemplate(this.financeDetails.cartSummary);
    }

    return '';
  }

  private readonly financeDetailsLoadedHandler = (
    financeDetails?: FinanceDetails | null,
  ): void => {
    this.financeDetails = financeDetails;

    this.render();
  };

  private listenPings(): void {
    this.window.addEventListener('message', this.pingCallback);
  }

  private readonly pingCallback = (message: MessageEvent): void => {
    const data = this.getJsonOrNull(message?.data);
    if (
      !data ||
      !isEventMessage(data) ||
      data.name !== EventName.requiredComponentPing ||
      (data.data as { componentName: string }).componentName !==
        this.componentName
    ) {
      return;
    }
    message.source?.postMessage(
      JSON.stringify({
        name: EventName.requiredComponentPong,
        data: { componentName: this.componentName },
      }),
      message.origin as WindowPostMessageOptions,
    );
  };
}
