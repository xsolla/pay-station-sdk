import i18next from 'i18next';
import { cdnIconsUrl } from '../../environment';

const logo = `${cdnIconsUrl}/logo.svg`;

export const getSecureConnectionTemplate = (): string => {
  return `
    <div class='logo'>
      <img src='${logo as string}'>
    </div>
    <div class='connection'>
      ${i18next.t('secure-connection')}
    </div>`;
};
