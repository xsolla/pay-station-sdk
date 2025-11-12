import { LegalComponentConfig } from './legal-component.config.interface';
import { LegalConfigPartComponentAbstract } from './legal-config-part-component.abstract';
import { getLegalComponentTemplate } from './legal.component.tempate';
import './legal.component.scss';

export class LegalComponent extends LegalConfigPartComponentAbstract {
  protected readonly componentName = 'LegalComponent';
  protected config?: LegalComponentConfig;

  protected getLegalPartHtml(): string {
    if (this.config) {
      return getLegalComponentTemplate(this.config);
    }
    return '';
  }
}
