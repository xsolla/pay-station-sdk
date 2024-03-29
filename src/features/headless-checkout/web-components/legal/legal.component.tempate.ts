import { LegalComponentConfig } from './legal-component.config.interface';
import { getSecureConnectionTemplate } from './secure-connection.component.template';
import i18next from 'i18next';

export const getLegalComponentTemplate = (
  config: LegalComponentConfig,
): string => {
  const {
    isJapanUser,
    refundPolicyUrl,
    sctlPolicyUrl,
    secureConnection,
    disclaimer,
  } = config;
  return `
    ${
      disclaimer
        ? `
  <div class='disclaimer'>
    ${i18next.t('disclaimer-with-cookies', {
      xsolla_terms_link: 'https://xsolla.com/eula',
      xsolla_privacy_link: 'https://xsolla.com/cookie',
      xsolla_help_link: 'https://help.xsolla.com/',
    })}
  </div>`
        : ''
    }
   <div class='additional-info'>
   ${getSecureConnectionTemplate(secureConnection)}
    <div class='legal-links'>
      <a
        class='link link-legal'
        href='https://xsolla.com/legal-agreements'
        target='_blank'
      >
        ${i18next.t('legal')}
      </a>

      <div class='divider'></div>

      <a
        class='link link-legal'
        href='https://xsolla.com/privacypolicy'
        target='_blank'
      >
        ${i18next.t('privacy-policy')}
      </a>

      <div class='divider'></div>

      <a
        class='link link-refund'
        href='${refundPolicyUrl}'
        target='_blank'
      >
        ${i18next.t('refund-policy')}
      </a>
      ${
        isJapanUser && sctlPolicyUrl
          ? `
      <div class='divider'></div>

      <a
        class='link sctl-link'
        href='${sctlPolicyUrl}'
        target='_blank'
      >
        ${i18next.t('sctl-indications')}
      </a>`
          : ''
      }
    </div>
   </div>`;
};
