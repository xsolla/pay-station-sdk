import { LegalPartComponentAbstract } from '../legal-part-component.abstract';
import { getLegalCookiesComponentTemplate } from './legal-cookies.component.template';

import './legal-cookies.component.scss';

export class LegalCookiesComponent extends LegalPartComponentAbstract {
  protected readonly componentName = 'LegalCookiesComponent';

  protected getLegalPartHtml(): string {
    return getLegalCookiesComponentTemplate();
  }
}
