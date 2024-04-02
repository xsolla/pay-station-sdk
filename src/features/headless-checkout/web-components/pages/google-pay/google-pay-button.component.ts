import { SecureComponentAbstract } from '../../../../../core/web-components/secure-component/secure-component.abstract';
import { headlessCheckoutAppUrl } from '../../../environment';
import { GooglePayButtonColorType } from './google-pay-button-color.type';

export class GooglePayButtonComponent extends SecureComponentAbstract {
  protected componentName = 'pages/google-pay-button';
  private buttonColor: GooglePayButtonColorType = 'default';

  public setButtonColor(color: GooglePayButtonColorType): void {
    this.buttonColor = color;
  }

  protected getHtml(): string {
    return this.getSecureHtml();
  }

  protected getSecureHtml(): string {
    return `<iframe allow='payment' src='${headlessCheckoutAppUrl}/secure-components/${this.componentName}?buttonColor=${this.buttonColor}'></iframe>`;
  }
}
