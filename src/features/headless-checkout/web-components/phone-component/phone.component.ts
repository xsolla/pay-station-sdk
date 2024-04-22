import { PhoneComponentAttributes } from './phone-component-attributes.enum';
import { headlessCheckoutAppUrl } from '../../environment';
import { TextComponent } from '../text-component/text.component';
import { property, customElement } from 'lit/decorators.js';

@customElement('psdk-phone')
export class PhoneComponent extends TextComponent {
  @property({ attribute: PhoneComponentAttributes.name })
  protected inputName = 'phone';

  @property({ type: Boolean, attribute: PhoneComponentAttributes.showFlags })
  private readonly showFlags = false;

  protected getSecureHtml(): string {
    if (!this.componentName) {
      throw new Error('Component name is required');
    }

    let src = `${headlessCheckoutAppUrl}/secure-components/${this.componentName}`;
    if (this.showFlags) {
      src += '?showFlags=true';
    }
    return `<iframe src='${src}'></iframe>`;
  }
}
