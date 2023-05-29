import { WebComponentAbstract } from '../web-component.abstract';
import { headlessCheckoutAppUrl } from '../../../features/headless-checkout/variables';


export abstract class SecureComponentAbstract extends WebComponentAbstract {
  protected abstract componentName: string;

  protected getSecureHtml(): string {
    return `<iframe src='${headlessCheckoutAppUrl}/secure-components/${this.componentName}'></iframe>`;
  }
}
