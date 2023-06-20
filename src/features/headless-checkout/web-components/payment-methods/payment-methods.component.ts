import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { PaymentMethod } from '../../../../core/payment-method.interface';
import { getPaymentMethodTemplate } from './payment-method.template';
import { filterPaymentMethods } from './filter-payment-methods.function';
import { PaymentMethodsAttributes } from './payment-methods-attributes.enum';
import { PaymentMethodsEvents } from './payment-methods-events.enum';
import { HeadlessCheckoutSpy } from '../../../../core/headless-checkout-spy/headless-checkout-spy';
import { HeadlessCheckout } from '../../headless-checkout';

export class PaymentMethodsComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private paymentMethods?: PaymentMethod[];
  private visibleMethods?: PaymentMethod[];
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

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  public static get observedAttributes(): string[] {
    return [PaymentMethodsAttributes.country];
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    void this.headlessCheckout
      .getRegularMethods()
      .then(this.paymentMethodsLoadedHandler);
  }

  protected getHtml(): string {
    const paymentMethodsHtml = this.getMethodsHtml();
    return `
      <input type="text" class="search" placeholder="${this.searchPlaceHolder}">
      <ul class="payment-methods">
        ${paymentMethodsHtml ? paymentMethodsHtml.join('') : this.notFoundValue}
      </ul>
    `;
  }

  protected attributeChangedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      return;
    }
    void this.headlessCheckout
      .getRegularMethods()
      .then(this.paymentMethodsLoadedHandler);
  }

  private readonly paymentMethodsLoadedHandler = (
    paymentMethods: PaymentMethod[]
  ): void => {
    this.paymentMethods = paymentMethods;
    this.visibleMethods = this.paymentMethods.filter(
      (method) => method.isVisible
    );
    this.filteredMethods = this.visibleMethods.slice();

    super.render();
    this.listenClicks();
    this.setupSearch();
  };

  private getMethodsHtml(): string[] | null {
    if (this.filteredMethods?.length) {
      return this.filteredMethods.map((method) =>
        getPaymentMethodTemplate(method)
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
    const eventOptions = {
      bubbles: true,
      composed: true,
      detail: {
        paymentMethodId: this.getPaymentMethodId(target),
      },
    };

    this.listRef.dispatchEvent(
      new CustomEvent(PaymentMethodsEvents.selectionChange, eventOptions)
    );
  }

  private getPaymentMethodId(target: HTMLElement): string | null | undefined {
    const attributeName = 'data-method-id';

    if (typeof target?.closest === 'function') {
      return target.closest('a')?.getAttribute(attributeName);
    }
    return (
      target.getAttribute(attributeName) ??
      target.parentElement?.getAttribute(attributeName)
    );
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
            this.visibleMethods,
            searchValue
          );
          this.updateMethodsView();
        }
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
