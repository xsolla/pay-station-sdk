import { getStatusComponentTemplate } from './status.component.template';
import { StatusComponentConfig } from './template-config/status.component.config.interface';
import { StatusEnum } from '../../../../core/status/status.enum';
import i18next from 'i18next';

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

  it('Should render retry button when enabled', () => {
    spyOn(i18next, 't').and.returnValue('Try again');

    const template = getStatusComponentTemplate({
      ...mockStatusConfig,
      showRetryButton: true,
    });

    expect(template).toContain('retry-button');
    expect(template).toContain('Try again');
    expect(i18next.t).toHaveBeenCalledWith('status.try-again-button');
  });

  it('Should not render retry button when disabled', () => {
    const template = getStatusComponentTemplate({
      ...mockStatusConfig,
      showRetryButton: false,
    });

    expect(template).not.toContain('retry-button');
  });
});
