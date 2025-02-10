import { LegalPartComponentAbstract } from '../legal-part-component.abstract';
import { getLegalTermsComponentTemplate } from './legal-terms.component.tempate';

import './legal-terms.component.scss';

export class LegalTermsComponent extends LegalPartComponentAbstract {
  protected readonly componentName = 'LegalTermsComponent';

  protected getHtml(): string {
    return getLegalTermsComponentTemplate();
  }
}
