import i18next from 'i18next';
import { termsUrl } from '../links.const';
import {
  LegalArea,
  LegalComponentConfig,
} from '../legal-component.config.interface';

const legalAreaLabelMap = new Map<LegalArea, string>([
  ['US', 'legal-terms-us'],
  ['EU', 'legal-terms-eu'],
]);

const getLabel = (legalArea: LegalArea = 'other'): string => {
  return legalAreaLabelMap.get(legalArea) ?? 'legal-terms';
};

export const getLegalTermsComponentTemplate = (
  config: LegalComponentConfig,
): string => {
  const label = getLabel(config.legalArea);
  return i18next.t(label, {
    xsolla_terms_link: termsUrl,
  });
};
