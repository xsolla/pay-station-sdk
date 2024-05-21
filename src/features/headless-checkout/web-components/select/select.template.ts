import { SelectComponentConfig } from './select-component.config.interface';

const arrowIcon = `<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fill-rule='evenodd' clip-rule='evenodd' d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z' fill='#18171C'/>
</svg>`;
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
            ${arrowIcon}
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
