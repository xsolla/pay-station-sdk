import { headlessCheckoutAppUrl } from '../../../features/headless-checkout/environment';
import { LitWebComponentAbstract } from '../lit-web-component.abstract';
import { property } from 'lit/decorators.js';

export abstract class LitSecureComponentAbstract extends LitWebComponentAbstract {
  @property({ attribute: false })
  protected componentName: string | null = null;

  protected getSecureHtml(): string {
    if (!this.componentName) {
      throw new Error('Component name is required');
    }

    return `<iframe src='${headlessCheckoutAppUrl}/secure-components/${this.componentName}'></iframe>`;
  }
}
