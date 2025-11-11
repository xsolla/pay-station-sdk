import { LegalConfigPartComponentAbstract } from '../legal-config-part-component.abstract';
import { getLegalMorComponentTemplate } from './legal-mor.component.tempate';

import './legal-mor.component.scss';

export class LegalMorComponent extends LegalConfigPartComponentAbstract {
  protected readonly componentName = 'LegalMorComponent';

  protected getLegalPartHtml(): string {
    if (this.config) {
      return getLegalMorComponentTemplate(this.config);
    }
    return '';
  }
}
