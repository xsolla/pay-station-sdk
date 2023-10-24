import { ControlComponentConfig } from '../control-component-config.interface';
import { TextConfigTooltip } from './text-config-tooltip.interface';

export interface TextComponentConfig extends ControlComponentConfig {
  secureHtml: string;
  additionalControls?: string;
  tooltip?: TextConfigTooltip;
}
