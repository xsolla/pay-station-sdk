import { TextConfigTooltip } from './text-component/text-config-tooltip.interface';

export interface ControlComponentConfig {
  controlType?: string;
  dataType?: string;
  name?: string;
  title?: string;
  placeholder?: string;
  readonly?: boolean;
  options?: Array<{ label: string; value: string }>;
  tooltip?: TextConfigTooltip;
  error?: string | null;
  additionalControls?: string;
}
