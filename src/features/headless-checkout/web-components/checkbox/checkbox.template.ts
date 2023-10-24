import { XpsBoolean } from '../../../../core/xps-boolean.enum';
import { CheckboxComponentConfig } from './checkbox-component-config.interface';

export const getCheckboxComponentTemplate = (
  config: CheckboxComponentConfig
): string => {
  const isChecked = config.initValue === XpsBoolean.true;
  const placeholder = config.placeholder;

  return `
    <label for='${config.name}' class='wrapper'>
       <input
        class='checkbox'
        type='checkbox'
        id='${config.name}'
        name='${config.name}'
        ${isChecked ? 'checked' : ''}
        />
        ${placeholder ? `<span class='label'>${placeholder}</span>` : ''}
  </label>
 `;
};
