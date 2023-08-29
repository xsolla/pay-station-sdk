import { TextComponentConfig } from './text.component.config.interface';

export interface TextComponentData extends TextComponentConfig {
  secureHtml: string;
}

const getLabelTemplate = (title?: string): string => {
  return title ? `<div class="label">${title}</div>` : '';
};

const getDescriptionTemplate = (tooltip?: string): string => {
  return tooltip ? `<div class="description">${tooltip}</div>` : '';
};

const getErrorsTemplate = (error?: string): string => {
  return error ? `<div class="field-error">${error}</div>` : '';
};

export const getTextComponentTemplate = ({
  secureHtml,
  title,
  error,
  tooltip,
}: TextComponentData): string => {
  return `
  ${getLabelTemplate(title)}
  ${getDescriptionTemplate(tooltip)}
  <div class="wrapper">
  ${secureHtml}
  </div>
  ${getErrorsTemplate(error)}`;
};
