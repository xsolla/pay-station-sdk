import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { HeadlessCheckout } from '../../headless-checkout';
import { applePayId } from '../apple-pay/apple-pay-id.const';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { DefaultSubmitButtonAttributes } from './default-submit-button/default-submit-button-attributes.enum';
import { getSubmitButtonTemplate } from './submit-button.template';

export class SubmitButtonComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly formSpy: FormSpy;
  private wasRendered = false;
  private get isApplePayButton(): boolean {
    return (
      this.headlessCheckout.formConfiguration?.paymentMethodId === applePayId
    );
  }

  public static get observedAttributes(): string[] {
    return [
      DefaultSubmitButtonAttributes.isLoading,
      DefaultSubmitButtonAttributes.text,
    ];
  }

  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.formSpy = container.resolve(FormSpy);
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    this.render();
  }

  protected render(): void {
    if (this.isApplePayButton && this.wasRendered) {
      return;
    }
    this.wasRendered = true;
    super.render();
  }

  protected getHtml(): string {
    if (this.isApplePayButton) {
      return `<${WebComponentTagName.ApplePayComponent}></${WebComponentTagName.ApplePayComponent}>`;
    }
    return getSubmitButtonTemplate(
      this.getAttribute(DefaultSubmitButtonAttributes.text) ?? '',
      !!this.getAttribute(DefaultSubmitButtonAttributes.isLoading),
    );
  }
}
