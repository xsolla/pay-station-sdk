import { ValidationErrors } from './validation-errors.interface';

export interface FieldStatus {
  name: string;
  validationStatus: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
  errors: ValidationErrors | null;
  isFocused?: boolean;
}
