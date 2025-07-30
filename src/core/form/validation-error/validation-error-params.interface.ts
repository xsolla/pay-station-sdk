import { ValidationErrorId } from './validation-error-id.enum';

export interface ValidationErrorParams {
  id: ValidationErrorId;
  defaultMessage?: string;
  [key: string]: unknown;
}
