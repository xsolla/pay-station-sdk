import { SecureComponentAbstract } from '../../../../../core/web-components/secure-component/secure-component.abstract';
import { headlessCheckoutAppUrl } from '../../../environment';

export class GooglePayButtonComponent extends SecureComponentAbstract {
  protected componentName = 'pages/google-pay-button';

  protected getHtml(): string {
    return this.getSecureHtml();
  }

  protected getSecureHtml(): string {
    return `<iframe allow='payment' src='${headlessCheckoutAppUrl}/secure-components/${this.componentName}'></iframe>`;
  }
}
