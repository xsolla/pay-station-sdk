import i18next from 'i18next';
import { LegalComponentConfig } from './legal-component.config.interface';
import {
  cookieUrl,
  helpUrl,
  legalAgreementsUrl,
  privacyPolicyUrl,
  termsUrl,
} from './links.const';

export const getLegalComponentTemplate = (
  config: LegalComponentConfig,
): string => {
  const { isJapanUser, refundPolicyUrl, sctlPolicyUrl, disclaimer } = config;
  return `
    ${
      disclaimer
        ? `
  <div class='disclaimer'>
    ${i18next.t('disclaimer-with-cookies', {
      xsolla_terms_link: termsUrl,
      xsolla_privacy_link: cookieUrl,
      xsolla_help_link: helpUrl,
    })}
  </div>`
        : ''
    }
   <div class='additional-info'>
    <div class='legal-links'>
      <a
        class='link link-legal'
        href='${legalAgreementsUrl}'
        target='_blank'
      >
        ${i18next.t('legal')}
      </a>

      <div class='divider'></div>

      <a
        class='link link-legal'
        href='${privacyPolicyUrl}'
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
