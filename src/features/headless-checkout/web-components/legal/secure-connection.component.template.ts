import { LegalComponentConfig } from './legal-component.config.interface';
import logo from '../../../../assets/icons/logo.svg';
import i18next from 'i18next';
export const getSecureConnectionTemplate = (
  secureConnection?: LegalComponentConfig['secureConnection']
): string => {
  const isWhiteLabel = secureConnection?.isWhiteLabel;
  const secureConnectionUrl = secureConnection?.secureConnectionUrl;
  return `
  <div class="info">
  <div class="company">
    ${
      !isWhiteLabel && secureConnectionUrl
        ? `

    <a
      class="logo"
      [href]="secureConnectionUrl"
      target="_blank"
    >
      <img src="${logo as string}">
    </a>`
        : `

      <span class="logo">
      <img src="${logo as string}">

      </span>`
    }
    <div class="connection">
    ${i18next.t('secure-connection')}
    </div>
  </div>
</div>
`;
};
