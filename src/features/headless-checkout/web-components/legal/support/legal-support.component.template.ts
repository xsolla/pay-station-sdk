import i18next from 'i18next';
import { helpUrl } from '../links.const';

export const getLegalSupportComponentTemplate = (): string => {
  return i18next.t('legal-support', {
    xsolla_help_link: helpUrl,
  });
};
