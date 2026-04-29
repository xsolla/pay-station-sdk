import i18next from 'i18next';
import { cookieUrl } from '../links.const';

export const getLegalCookiesComponentTemplate = (): string => {
  return i18next.t('legal-cookies', {
    xsolla_privacy_link: cookieUrl,
  });
};
