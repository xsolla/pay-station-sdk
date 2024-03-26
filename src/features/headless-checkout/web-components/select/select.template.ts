import { SelectComponentConfig } from './select-component.config.interface';
import arrow from '../../../../assets/icons/arrow-down.svg';

export const getSelectOptionTemplate = (
  option: {
    label: string;
    value: string;
  },
  index: number,
): string => {
  return `
    <a class='option' data-option-index='${index}' role='option' data-option-key-letter='${option.label[0].toLowerCase()}'>
      <div class='option-content' data-option-value='${option.value}'>
        ${option.label}
      </div>
    </a>
  `;
};

export const getSelectComponentTemplate = (
  config: SelectComponentConfig,
): string => {
  return `
    <div class='wrapper'>
      ${config.title ? `<label>${config.title}</label>` : ''}

        <button tabindex='0' id='select-button' type='button' class='select'>
          <span id='select-content' class='select-content'>
            ${config.options?.length ? config.options[0].label : ''}
          </span>

          <div class='arrow-wrapper'>
            <div id='dropdown-icon' class='arrow arrow-down'>
              <img src='${arrow as string}'>
            </div>
          </div>
        </button>
      <div id='dropdown-wrapper' class='dropdown-wrapper'>
        <div class='dropdown'>
          <div id='select-options' class='select-options' role='listbox'>
          </div>
        </div>
      </div>

      ${config.error ? `<div class='field-error'>${config.error}</div>` : ''}
    </div>
  `;
};
