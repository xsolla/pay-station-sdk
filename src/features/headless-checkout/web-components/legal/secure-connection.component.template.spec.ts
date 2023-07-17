import { LegalComponentConfig } from './legal-component.config.interface';
import { getSecureConnectionTemplate } from './secure-connection.component.template';

const mockSecureConnection: LegalComponentConfig['secureConnection'] = {
  isWhiteLabel: false,
  secureConnectionUrl: 'secureConnectionUrl',
};

const mockSecureConnectionWhiteLabel: LegalComponentConfig['secureConnection'] =
  {
    isWhiteLabel: true,
    secureConnectionUrl: 'secureConnectionUrl',
  };

describe('getSecureConnectionTemplate', () => {
  it('Should contains legal-links', () => {
    expect(getSecureConnectionTemplate(mockSecureConnection)).toContain(
      'logo-link'
    );
  });

  it('Should not draw link if is white label', () => {
    expect(
      getSecureConnectionTemplate(mockSecureConnectionWhiteLabel)
    ).not.toContain('logo-link');
  });
});
