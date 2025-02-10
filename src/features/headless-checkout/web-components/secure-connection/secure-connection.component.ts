import { container } from 'tsyringe';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { getSecureConnectionTemplate } from './secure-connection.component.tempate';

import './secure-connection.component.scss';

export class SecureConnectionComponent extends WebComponentAbstract {
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }

    this.render();
  }

  protected getHtml(): string {
    return getSecureConnectionTemplate();
  }
}
