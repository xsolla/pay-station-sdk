import { getLegalComponentTemplate } from './legal.component.tempate';
import { LegalComponentConfig } from './legal-component.config.interface';

const mockConfig: LegalComponentConfig = {
  isJapanUser: false,
  refundPolicyUrl: 'refundPolicyUrl',
  sctlPolicyUrl: 'sctlPolicyUrl',
  disclaimer: 'disclaimer',
};

const mockConfigJapan: LegalComponentConfig = {
  isJapanUser: true,
  refundPolicyUrl: 'refundPolicyUrl',
  sctlPolicyUrl: 'sctlPolicyUrl',
  disclaimer: 'disclaimer',
};

describe('getLegalComponentTemplate', () => {
  it('Should contains legal-links', () => {
    expect(getLegalComponentTemplate(mockConfig)).toContain('legal-links');
  });

  it('Should contains sctl-link', () => {
    expect(getLegalComponentTemplate(mockConfigJapan)).toContain('sctl-link');
  });
});
