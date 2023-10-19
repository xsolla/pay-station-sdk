import { XpsBoolean } from '../../../../core/xps-boolean.enum';

export interface CheckboxComponentConfig {
  autocomplete: string;
  controlType: string;
  dataType: string;
  initValue: XpsBoolean;
  name: string;
  placeholder: string;
  title: string;
  error?: string | null;
}
