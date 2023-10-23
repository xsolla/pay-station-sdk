import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { CheckoutForm } from '../../../../core/actions/three-ds/checkout-form.interface';
import { ThreeDsAttributes } from './three-ds-attributes.enum';

export class ThreeDsComponent extends WebComponentAbstract {
  private readonly window: Window;

  private get elementRef(): HTMLElement {
    return this.querySelector('div')! as HTMLElement;
  }

  private get challengeAttribute(): CheckoutForm | null {
    const challengeString = this.getAttribute(ThreeDsAttributes.challenge);

    if (!challengeString) {
      return null;
    }

    try {
      return JSON.parse(challengeString) as CheckoutForm;
    } catch (error: unknown) {
      return null;
    }
  }

  public constructor() {
    super();

    this.window = container.resolve(Window);
  }

  public static get observedAttributes(): string[] {
    return [ThreeDsAttributes.challenge];
  }

  protected connectedCallback(): void {
    if (this.challengeAttribute) {
      this.render();

      this.openChallengeWindowViaForm(this.challengeAttribute);
    }
  }

  protected attributeChangedCallback(): void {
    if (this.challengeAttribute) {
      this.render();

      this.openChallengeWindowViaForm(this.challengeAttribute);
    }
  }

  protected getHtml(): string {
    return '<div></div>';
  }

  private openChallengeWindowViaForm(checkoutFormData: CheckoutForm): void {
    const target = '_self';
    const attributes: { [key: string]: string } = {
      method: checkoutFormData.method,
      action: checkoutFormData.action,
      target,
    };

    const form = this.window.document.createElement('form');

    this.setElementAttributes(form, attributes);

    if (checkoutFormData.params) {
      for (const param in checkoutFormData.params) {
        const input = this.window.document.createElement('input');
        input.type = 'hidden';
        input.name = param;
        input.value = checkoutFormData.params[param];

        form.appendChild(input);
      }
    }

    this.elementRef.append(form);

    this.window.open('', target);

    form.target = target;
    form.submit();

    this.elementRef.removeChild(form);
  }

  private setElementAttributes(
    element: HTMLElement,
    attributes: { [key: string]: string },
  ): void {
    Object.keys(attributes).forEach((name) => {
      element.setAttribute(name, attributes[name]);
    });
  }
}
