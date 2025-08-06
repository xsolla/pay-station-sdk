import { XpsBoolean } from '../../../../core/xps-boolean.enum';
import { CheckboxComponentConfig } from './checkbox-component-config.interface';
import { cdnIconsUrl } from '../../environment';

const check = `${cdnIconsUrl}/white-check.svg`;

export const getCheckboxComponentTemplate = (
  config: CheckboxComponentConfig,
): string => {
  const isChecked = config.initValue === XpsBoolean.true;
  const placeholder = config.placeholder;
  const error = config.error;

  return `
    <div class='checkbox'>
       <input
        type='checkbox'
        id='${config.name}'
        name='${config.name}'
        ${isChecked ? 'checked' : ''}
        />
        <div class='checkbox-dummy'>
          ${isChecked ? `<img src='${check}' alt='checkbox'>` : ''}
        </div>
        <div class='wrapper'>
          ${placeholder ? `<span class='label'>${placeholder}</span>` : ''}
          ${error ? `<span class='field-error'>${error}</span>` : ''}
        </div>
  </div>
 `;
};
