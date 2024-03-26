import { ControlComponentConfig } from '../control-component-config.interface';
import { TextConfigTooltip } from '../text-component/text-config-tooltip.interface';

export interface SelectComponentConfig extends ControlComponentConfig {
  readonly?: boolean;
  options?: Array<{ label: string; value: string }>;
  tooltip?: TextConfigTooltip;
  initValue?: string;
}
