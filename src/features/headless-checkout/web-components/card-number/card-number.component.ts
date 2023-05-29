import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';

export class CardNumberComponent extends SecureComponentAbstract {
  protected componentName = 'card-number';

  public constructor() {
    super();
  }

  protected getHtml(): string {
    return `
    <div class='label'></div>${this.getSecureHtml()}
    `;
  }
}