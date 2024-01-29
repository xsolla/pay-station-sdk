import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { HeadlessCheckout } from '../../headless-checkout';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { container } from 'tsyringe';
import { SavedMethod } from '../../../../core/saved-method.interface';
import { getSavedMethodTemplate } from './saved-method.template';
import { SavedMethodsAttributes } from './saved-methods-attributes.enum';
import { SavedMethodAttributes } from './saved-method-attributes.enum';
import { SavedMethodsEvents } from './saved-methods-events.enum';

export class SavedMethodsComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private savedMethods?: SavedMethod[];

  private get listRef(): HTMLElement {
    return this.querySelector('ul') as HTMLElement;
  }

  private get notFoundValue(): string {
    return this.getAttribute(SavedMethodsAttributes.notFound) ?? '';
  }

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
    this.loadSavedMethods();
  }

  protected getHtml(): string {
    const savedMethodsHtml = this.getMethodsHtml();
    return `
      <ul class='saved-methods'>
        ${savedMethodsHtml ? savedMethodsHtml.join('') : this.notFoundValue}
      </ul>
    `;
  }

  private loadSavedMethods(): void {
    void this.headlessCheckout
      .getSavedMethods()
      .then(this.savedMethodsLoadedHandler);
  }

  private readonly savedMethodsLoadedHandler = (
    savedMethods: SavedMethod[]
  ): void => {
    this.savedMethods = savedMethods;

    super.render();
    this.listenClicks();
  };

  private getMethodsHtml(): string[] | null {
    if (this.savedMethods?.length) {
      return this.savedMethods.map((method) => getSavedMethodTemplate(method));
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
        ...this.getSavedMethodData(target),
      },
    };

    this.listRef.dispatchEvent(
      new CustomEvent(SavedMethodsEvents.savedMethodSelected, eventOptions)
    );
  }

  private getSavedMethodData(target: HTMLElement): {
    paymentMethodId: string | null | undefined;
    savedMethodId: string | null | undefined;
  } {
    return {
      paymentMethodId: target
        .closest('li')
        ?.getAttribute(SavedMethodAttributes.paymentMethodId),
      savedMethodId: target
        .closest('li')
        ?.getAttribute(SavedMethodAttributes.savedMethodId),
    };
  }
}
