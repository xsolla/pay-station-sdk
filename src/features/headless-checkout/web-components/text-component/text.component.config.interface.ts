import { TextConfigTooltip } from './text-config-tooltip.interface';

export interface TextComponentConfig {
  name?: string;
  title?: string;
  tooltip?: TextConfigTooltip;
  error?: string | null;
}
