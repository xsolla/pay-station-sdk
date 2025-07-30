import i18next from 'i18next';
import { singleton } from 'tsyringe';
import { validationErrorKeyMap } from './validation-error-key-map.const';
import { ValidationErrorParams } from './validation-error-params.interface';
import { ValidationErrors } from './validation-errors.interface';

@singleton()
export class ValidationErrorService {
  public getMessage(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    const firstErrorKey = Object.keys(errors)[0];
    const error = errors[firstErrorKey] ?? null;

    if (!error) return null;

    const defaultMessage = error.message ?? null;
    if (!error.params?.id) return defaultMessage;

    return this.translate(error.params) ?? defaultMessage;
  }

  private translate(params: ValidationErrorParams): string | null {
    const translationKey = validationErrorKeyMap.get(params.id);
    if (!translationKey) return null;

    return params.defaultMessage ?? i18next.t(translationKey, params);
  }
}
