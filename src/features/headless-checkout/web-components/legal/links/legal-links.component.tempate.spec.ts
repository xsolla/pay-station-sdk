import { LegalComponentConfig } from '../legal-component.config.interface';
import { getLegalLinksComponentTemplate } from './legal-links.component.tempate';

const config: LegalComponentConfig = {
  isJapanUser: false,
  refundPolicyUrl: 'refundPolicyUrl',
};

const jaConfig: LegalComponentConfig = {
  isJapanUser: true,
  refundPolicyUrl: 'refundPolicyUrl',
  sctlPolicyUrl: 'sctlPolicyUrl',
};

describe('getLegalLinksComponentTemplate', () => {
  it('Should contains agreement link', () => {
    expect(getLegalLinksComponentTemplate(config)).toContain(
      'https://xsolla.com/legal-agreements',
    );
  });

  it('Should contains privacy policy link', () => {
    expect(getLegalLinksComponentTemplate(config)).toContain(
      'https://xsolla.com/privacypolicy',
    );
  });

  it('Should contains sctl-link', () => {
    expect(getLegalLinksComponentTemplate(jaConfig)).toContain('sctlPolicyUrl');
  });
});
