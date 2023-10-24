import { XpsBoolean } from '../../../../core/xps-boolean.enum';
import { ControlComponentConfig } from '../control-component-config.interface';

export interface CheckboxComponentConfig extends ControlComponentConfig {
  name: string;
  initValue: XpsBoolean;
  error?: string | null;
}
