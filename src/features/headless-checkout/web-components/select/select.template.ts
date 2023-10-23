import { SelectComponentConfig } from './select-component.config.interface';

export const getSelectOptionTemplate = (option: {
  label: string;
  value: string;
}): string => {
  return `
    <a class="option">
      <div class="option-content" data-option-value="${option.value}">
        ${option.label}
      </div>
    </a>
  `;
};

export const getSelectComponentTemplate = (
  config: SelectComponentConfig
): string => {
  return `
    <div class="wrapper">
      ${config.title ? `<label>${config.title}</label>` : ''}
      
      <div class="select-wrapper">
        <button id="select-button" type="button" class="select">
          <span id="select-content" class="select-content">
            ${config.options?.length ? config.options[0].label : ''}
          </span>
        </button>
        
        <div class="arrow-wrapper">
          <div id="dropdown-icon" class="arrow"></div>
        </div>
      </div>
      <div id="dropdown-wrapper" class="dropdown-wrapper">
        <div class="dropdown">
          <div id="select-options" class="select-options">
          </div>
        </div>
      </div>
      
      ${config.error ? `<div class="field-error">${config.error}</div>` : ''}
    </div> 
  `;
};
