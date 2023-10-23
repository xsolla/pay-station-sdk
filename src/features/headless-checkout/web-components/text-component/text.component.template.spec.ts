import { getTextComponentTemplate } from './text.compontent.template';
import { TextComponentConfig } from './text-component.config.interface';

const mockedData: TextComponentConfig = {
  secureHtml: 'secureHtml',
  title: 'title',
  tooltip: { text: 'tooltip' },
  error: 'error',
};

describe('getTextComponentTemplate', () => {
  it('Should draw all blocks', () => {
    const template = getTextComponentTemplate(mockedData);

    expect(template).toContain('secureHtml');
    expect(template).toContain('title');
    expect(template).toContain('tooltip');
    expect(template).toContain('error');
  });

  it('Should draw only required parts', () => {
    const template = getTextComponentTemplate({
      secureHtml: mockedData.secureHtml,
    });
    expect(template).toContain('secureHtml');
    expect(template).not.toContain('title');
    expect(template).not.toContain('tooltip');
    expect(template).not.toContain('error');
  });
});
