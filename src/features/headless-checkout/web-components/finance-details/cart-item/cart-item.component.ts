import { WebComponentAbstract } from '../../../../../core/web-components/web-component.abstract';
import { getCartItemTemplate } from './cart-item.template';
import { CartItem } from '../../../../../core/finance-details/cart-item.interface';
import { CartItemAttributes } from './cart-item-attributes.enum';

export class CartItemComponent extends WebComponentAbstract {
  private item: CartItem | null = null;

  protected static get observedAttributes(): string[] {
    return [CartItemAttributes.item];
  }

  protected connectedCallback(): void {
    const itemJson = this.getAttribute(CartItemAttributes.item);

    if (itemJson) {
      this.item = JSON.parse(decodeURIComponent(itemJson));
    }

    this.render();
  }

  protected attributeChangedCallback(): void {
    this.connectedCallback();
  }

  protected render(): void {
    super.render();

    this.removeAllEventListeners();
    this.addImageErrorHandler();
  }

  protected getHtml(): string {
    if (!this.item) {
      return '';
    }

    return getCartItemTemplate(this.item);
  }

  private get rootElement(): this | ShadowRoot {
    return this.shadowRoot ?? this;
  }

  private addImageErrorHandler(): void {
    const image = this.rootElement.querySelector('img');
    const imageContainer = this.rootElement.querySelector(
      '.image-container',
    ) as unknown as HTMLDivElement;

    if (!image) {
      return;
    }

    this.addEventListenerToElement(image, 'error', () => {
      imageContainer.style.display = 'none';
    });
  }
}
