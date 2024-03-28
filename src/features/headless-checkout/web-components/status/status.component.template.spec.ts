import { getStatusComponentTemplate } from './status.component.template';
import { StatusComponentConfig } from './template-config/status.component.config.interface';
import { StatusEnum } from '../../../../core/status/status.enum';

const mockStatusConfig: StatusComponentConfig = {
  title: 'title',
  image: 'mock-image',
  description: '',
  showDescription: false,
  status: StatusEnum.done,
  autoCancellation: true,
};
const mockStatusConfigWithDescription: StatusComponentConfig = {
  title: 'title',
  image: 'mock-image',
  description: 'description',
  showDescription: true,
  status: StatusEnum.done,
  autoCancellation: true,
};

describe('getStatusComponentTemplate', () => {
  it('Should not contains description', () => {
    const template = getStatusComponentTemplate(mockStatusConfig);
    expect(template).toContain('title');
    expect(template).not.toContain('description');
  });

  it('Should contains description', () => {
    const template = getStatusComponentTemplate(
      mockStatusConfigWithDescription,
    );
    expect(template).toContain('description');
  });
});
