import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { TextComponentAttributes } from './text-component-attributes.enum';
import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';

export class TextComponent extends SecureComponentAbstract {
  private readonly formSpy: FormSpy;
  public constructor() {
    super();
    this.formSpy = container.resolve(FormSpy);
  }

  public static get observedAttributes(): string[] {
    return [TextComponentAttributes.name];
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.connectedCallback());
      return;
    }

    const inputName = this.getAttribute(TextComponentAttributes.name);
    if (!inputName) {
      return;
    }

    this.componentName = `text-input/${inputName}`;
    super.render();
  }

  protected attributeChangedCallback(): void {
    this.connectedCallback();
  }

  protected getHtml(): string {
    return `
 ${this.getSecureHtml()}
    `;
  }
}
