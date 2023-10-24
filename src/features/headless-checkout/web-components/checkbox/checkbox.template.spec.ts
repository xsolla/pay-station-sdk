import { getCheckboxComponentTemplate } from './checkbox.template';
import { CheckboxComponentConfig } from './checkbox-component-config.interface';
import { XpsBoolean } from '../../../../core/xps-boolean.enum';

const mockedData: CheckboxComponentConfig = {
  name: 'name',
  title: 'title',
  error: 'error',
  initValue: XpsBoolean.true,
  placeholder: 'test placeholder',
};

describe('getCheckboxComponentTemplate', () => {
  it('Should draw checkbox template', () => {
    const template = getCheckboxComponentTemplate(mockedData);

    expect(template).toContain('name');
    expect(template).toContain('checked');
    expect(template).toContain('test placeholder');
  });
});
