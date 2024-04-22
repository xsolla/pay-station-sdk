import { ControlComponentConfig } from '../control-component-config.interface';
import { TextConfigTooltip } from './text-config-tooltip.interface';
import { TemplateResult } from 'lit';

export interface TextComponentConfig extends ControlComponentConfig {
  secureHtml: string;
  additionalControls?: TemplateResult<1>;
  tooltip?: TextConfigTooltip;
}
