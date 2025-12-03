import { PhoneComponentAttributes } from './phone-component-attributes.enum';
import { TextComponent } from '../text-component/text.component';

export class PhoneComponent extends TextComponent {
  public static get observedAttributes(): string[] {
    return [PhoneComponentAttributes.showFlags];
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    if (!this.getAttribute(PhoneComponentAttributes.name)) {
      this.setAttribute(PhoneComponentAttributes.name, 'phone');
    }
  }

  protected getSecureHtml(): string {
    if (!this.componentName) {
      throw new Error('Component name is required');
    }

    const appUrl = this.environmentService.getHeadlessCheckoutAppUrl();
    let src = `${appUrl}/secure-components/${this.componentName}`;
    const showFlags = this.getAttribute(PhoneComponentAttributes.showFlags);

    if (showFlags) {
      src += '?showFlags=true';
    }
    return `<iframe src='${src}'></iframe>`;
  }
}
