import { LegalPartComponentAbstract } from '../legal-part-component.abstract';
import { getLegalSupportComponentTemplate } from './legal-support.component.tempate';

import './legal-support.component.scss';

export class LegalSupportComponent extends LegalPartComponentAbstract {
  protected readonly componentName = 'LegalSupportComponent';

  protected getLegalPartHtml(): string {
    return getLegalSupportComponentTemplate();
  }
}
