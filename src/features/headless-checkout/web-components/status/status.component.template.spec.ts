import { getStatusComponentTemplate } from './status.component.template';
import { StatusComponentConfig } from './template-config/status.component.config.interface';

const mockStatusConfig: StatusComponentConfig = {
  title: 'title',
  image: 'mock-image',
  description: '',
  showDescription: false,
};
const mockStatusConfigWithDescription: StatusComponentConfig = {
  title: 'title',
  image: 'mock-image',
  description: 'description',
  showDescription: true,
};

describe('getStatusComponentTemplate', () => {
  it('Should not contains description', () => {
    const template = getStatusComponentTemplate(mockStatusConfig);
    expect(template).toContain('image-container');
    expect(template).toContain('title');
    expect(template).not.toContain('description');
  });

  it('Should contains description', () => {
    const template = getStatusComponentTemplate(
      mockStatusConfigWithDescription
    );
    expect(template).toContain('description');
  });
});
