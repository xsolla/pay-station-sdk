import i18next from 'i18next';
import { drawIf } from '../../helpers/draw-if.helper';
import { LegalComponentConfig } from '../legal-component.config.interface';
import { legalAgreementsUrl, privacyPolicyUrl } from '../links.const';

export const getLegalLinksComponentTemplate = (
  config: LegalComponentConfig,
): string => {
  const { isJapanUser, refundPolicyUrl, sctlPolicyUrl } = config;
  return `
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

    ${drawIf(
      isJapanUser && sctlPolicyUrl,
      `
      <div class='divider'></div>

      <a
        class='link sctl-link'
        href='${sctlPolicyUrl}'
        target='_blank'
      >
        ${i18next.t('sctl-indications')}
      </a>`,
    )}`;
};
