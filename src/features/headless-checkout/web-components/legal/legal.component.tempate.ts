import i18next from 'i18next';
import { LegalComponentConfig } from './legal-component.config.interface';
import { legalAgreementsUrl, privacyPolicyUrl } from './links.const';
import { getLegalTermsComponentTemplate } from './terms/legal-terms.component.tempate';
import { getLegalCookiesComponentTemplate } from './cookies/legal-cookies.component.tempate';
import { getLegalMorComponentTemplate } from './mor/legal-mor.component.tempate';
import { getLegalSupportComponentTemplate } from './support/legal-support.component.tempate';

export const getLegalComponentTemplate = (
  config: LegalComponentConfig,
): string => {
  const { isJapanUser, refundPolicyUrl, sctlPolicyUrl, disclaimer } = config;
  return `
    ${
      disclaimer
        ? `
        <div class='disclaimer'>
          <div class="terms">
            ${getLegalTermsComponentTemplate(config)}
          </div>
          <div class="cookies">
            ${getLegalCookiesComponentTemplate()}
          </div>
          <div class="mor">
            ${getLegalMorComponentTemplate(config)}
          </div>
          <div class="support">
            ${getLegalSupportComponentTemplate()}
          </div>
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
