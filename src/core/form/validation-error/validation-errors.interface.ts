import { ValidationErrorParams } from './validation-error-params.interface';

export interface ValidationError {
  [key: string]: unknown;
  message?: string;
  params?: ValidationErrorParams;
}

export interface ValidationErrors {
  [key: string]: ValidationError;
}
