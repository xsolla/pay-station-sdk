import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { PaymentMethod } from '../../../../core/payment-method.interface';
import { getPaymentMethodTemplate } from './payment-method.template';
import { filterPaymentMethods } from './filter-payment-methods.function';
import { PaymentMethodsAttributes } from './payment-methods-attributes.enum';
import { PaymentMethodsEvents } from './payment-methods-events.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { HeadlessCheckout } from '../../headless-checkout';
import { PaymentMethodAttributes } from './payment-method-attributes.enum';
import './payment-methods.component.scss';

export class PaymentMethodsComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private paymentMethods?: PaymentMethod[];
  private filteredMethods?: PaymentMethod[];

  private get listRef(): HTMLElement {
    return this.querySelector('ul') as HTMLElement;
  }

  private get notFoundValue(): string {
    return this.getAttribute(PaymentMethodsAttributes.notFound) ?? '';
  }

  private get searchPlaceHolder(): string {
    return this.getAttribute(PaymentMethodsAttributes.searchPlaceholder) ?? '';
  }

  private get isSaveMethodMode(): boolean {
    return !!this.getAttribute(PaymentMethodsAttributes.saveMethodMode);
  }

  public constructor() {
    super();

    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  public static get observedAttributes(): string[] {
    return [
      PaymentMethodsAttributes.country,
      PaymentMethodsAttributes.skipPaymentMethodsCount,
    ];
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    this.loadRegularMethods();
  }

  protected getHtml(): string {
    const paymentMethodsHtml = this.getMethodsHtml();
    return `
      <div class='search-wrapper'>
        <input type='text' class='search' placeholder='${
          this.searchPlaceHolder
        }'>
      </div>
      <ul class='payment-methods'>
        ${paymentMethodsHtml ? paymentMethodsHtml.join('') : this.notFoundValue}
      </ul>
    `;
  }

  protected attributeChangedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      return;
    }
    this.loadRegularMethods();
  }

  private loadRegularMethods(): void {
    const country =
      this.getAttribute(PaymentMethodsAttributes.country) ?? undefined;

    void this.headlessCheckout
      .getRegularMethods({ country, isSaveMethodMode: this.isSaveMethodMode })
      .then(this.paymentMethodsLoadedHandler);
  }

  private readonly paymentMethodsLoadedHandler = (
    paymentMethods: PaymentMethod[],
  ): void => {
    const skipPaymentMethodsCount = Number(
      this.getAttribute(PaymentMethodsAttributes.skipPaymentMethodsCount),
    );

    this.paymentMethods = paymentMethods.slice(skipPaymentMethodsCount);

    this.filteredMethods = this.paymentMethods.slice();

    super.render();
    this.listenClicks();
    this.setupSearch();
  };

  private getMethodsHtml(): string[] | null {
    if (this.filteredMethods?.length) {
      return this.filteredMethods.map((method) =>
        getPaymentMethodTemplate(method),
      );
    }

    return null;
  }

  private listenClicks(): void {
    this.addEventListenerToElement(this.listRef, 'click', (event) => {
      event.preventDefault();
      if (event.target instanceof HTMLElement) {
        this.dispatchSelectionEvent(event.target);
      }
    });
  }

  private dispatchSelectionEvent(target: HTMLElement): void {
    const paymentMethodId = this.getPaymentMethodId(target);
    if (!paymentMethodId) {
      return;
    }

    const eventOptions = {
      bubbles: true,
      composed: true,
      detail: {
        paymentMethodId: paymentMethodId,
      },
    };

    this.listRef.dispatchEvent(
      new CustomEvent(PaymentMethodsEvents.selectionChange, eventOptions),
    );
  }

  private getPaymentMethodId(target: HTMLElement): string | null | undefined {
    return target.closest('li')?.getAttribute(PaymentMethodAttributes.methodId);
  }

  private setupSearch(): void {
    const searchInput = this.querySelector('.search');

    if (searchInput) {
      this.addEventListenerToElement(
        searchInput as HTMLInputElement,
        'input',
        (event) => {
          const searchValue = (event.target as HTMLInputElement).value;
          this.filteredMethods = filterPaymentMethods(
            this.paymentMethods,
            searchValue,
          );
          this.updateMethodsView();
        },
      );
    }
  }

  private updateMethodsView(): void {
    const paymentMethods = this.getMethodsHtml();
    this.listRef.innerHTML = paymentMethods
      ? paymentMethods.join('')
      : this.notFoundValue;
  }
}
