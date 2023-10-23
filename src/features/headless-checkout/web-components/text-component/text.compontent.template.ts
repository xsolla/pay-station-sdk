import { TextConfigTooltip } from './text-config-tooltip.interface';
import { TextComponentConfig } from './text.component.config.interface';

export interface TextComponentData extends TextComponentConfig {
  secureHtml: string;
}

const getLabelTemplate = (title?: string): string => {
  return title ? `<div class="label">${title}</div>` : '';
};

const getDescriptionTemplate = (tooltip?: TextConfigTooltip): string => {
  return tooltip?.text ? `<div class="description">${tooltip.text}</div>` : '';
};

const getErrorsTemplate = (error?: string | null): string => {
  return error ? `<div class="field-error">${error}</div>` : '';
};

export const getTextComponentTemplate = ({
  secureHtml,
  title,
  error,
  tooltip,
  additionalControls,
}: TextComponentData): string => {
  return `
  ${getLabelTemplate(title)}
  ${getDescriptionTemplate(tooltip)}
  <div class="wrapper ${
    additionalControls ? 'wrapper--additional-controls' : ''
  }">
  ${secureHtml}
  ${additionalControls ? additionalControls : ''}
  </div>
  ${getErrorsTemplate(error)}`;
};
