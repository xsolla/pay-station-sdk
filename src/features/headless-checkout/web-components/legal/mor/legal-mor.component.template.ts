import i18next from 'i18next';
import {
  LegalArea,
  LegalComponentConfig,
} from '../legal-component.config.interface';
import { termsUrl } from '../links.const';

const legalAreaLabelMap = new Map<LegalArea, string>([['EU', 'legal-mor-eu']]);

const getLabel = (legalArea: LegalArea = 'other'): string => {
  return legalAreaLabelMap.get(legalArea) ?? 'legal-mor';
};

export const getLegalMorComponentTemplate = (
  config: LegalComponentConfig,
): string => {
  const label = getLabel(config.legalArea);
  return i18next.t(label, {
    xsolla_terms_link: termsUrl,
  });
};
