import i18next from 'i18next';
import { termsUrl } from '../links.const';

export const getLegalTermsComponentTemplate = (): string => {
  return i18next.t('legal-terms', {
    xsolla_terms_link: termsUrl,
  });
};
