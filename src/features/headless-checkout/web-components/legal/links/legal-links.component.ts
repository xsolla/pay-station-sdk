import { LegalComponentConfig } from '../legal-component.config.interface';
import { LegalConfigPartComponentAbstract } from '../legal-config-part-component.abstract';
import { getLegalLinksComponentTemplate } from './legal-links.component.tempate';

import './legal-links.component.scss';

export class LegalLinksComponent extends LegalConfigPartComponentAbstract {
  protected readonly componentName = 'LegalLinksComponent';
  protected config?: LegalComponentConfig;

  protected getLegalPartHtml(): string {
    if (this.config) {
      return getLegalLinksComponentTemplate(this.config);
    }
    return '';
  }
}
