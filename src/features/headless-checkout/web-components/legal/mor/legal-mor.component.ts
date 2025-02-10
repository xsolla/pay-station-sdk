import { LegalPartComponentAbstract } from '../legal-part-component.abstract';
import { getLegalMorComponentTemplate } from './legal-mor.component.tempate';

import './legal-mor.component.scss';

export class LegalMorComponent extends LegalPartComponentAbstract {
  protected readonly componentName = 'LegalMorComponent';

  protected getHtml(): string {
    return getLegalMorComponentTemplate();
  }
}
