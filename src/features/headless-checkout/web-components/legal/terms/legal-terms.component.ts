import { getLegalTermsComponentTemplate } from './legal-terms.component.tempate';
import { LegalConfigPartComponentAbstract } from '../legal-config-part-component.abstract';

import './legal-terms.component.scss';

export class LegalTermsComponent extends LegalConfigPartComponentAbstract {
  protected readonly componentName = 'LegalTermsComponent';

  protected getLegalPartHtml(): string {
    if (this.config) {
      return getLegalTermsComponentTemplate(this.config);
    }
    return '';
  }
}
