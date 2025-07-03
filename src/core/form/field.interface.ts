import { XpsBoolean } from '../xps-boolean.enum';

export interface Field {
  name: string;
  type: string;
  value: string;
  title: string;
  example: string;
  options?: unknown[];
  isMandatory: XpsBoolean;
  isReadonly?: XpsBoolean;
  tooltip?: string;
  regex?: string;
  validation_error_msg?: string;
  label_hint?: string;
  javascript: {
    change: {
      mutableFields: string[];
      staticParams: { [key: string]: string };
      params: string[];
    };
  };
}
