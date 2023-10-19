import { TextConfigTooltip } from './text-config-tooltip.interface';

export interface ControlComponentConfig {
  name?: string;
  title?: string;
  tooltip?: TextConfigTooltip;
  error?: string | null;
  additionalControls?: string;
}
