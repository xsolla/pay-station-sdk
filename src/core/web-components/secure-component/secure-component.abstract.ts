import { WebComponentAbstract } from '../web-component.abstract';
import { headlessCheckoutAppUrl } from '../../../features/headless-checkout/environment';

export abstract class SecureComponentAbstract extends WebComponentAbstract {
  protected componentName: string | null = null;

  protected getSecureHtml(): string {
    if (!this.componentName) {
      throw new Error('Component name is required');
    }

    return `<iframe src='${headlessCheckoutAppUrl}/secure-components/${this.componentName}'></iframe>`;
  }
}
