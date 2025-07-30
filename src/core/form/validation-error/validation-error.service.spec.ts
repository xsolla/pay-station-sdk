import * as i18next from 'i18next';
import { ValidationErrorId } from './validation-error-id.enum';
import { ValidationErrorService } from './validation-error.service';
import { ValidationErrorParams } from './validation-error-params.interface';
import { ValidationErrors } from './validation-errors.interface';

describe('ValidationErrorService', () => {
  let service: ValidationErrorService;

  beforeEach(() => {
    service = new ValidationErrorService();
  });

  it('should return null for null errors', () => {
    const result = service.getMessage(null);
    expect(result).toBeNull();
  });

  it('should return null for empty errors object', () => {
    const result = service.getMessage({});
    expect(result).toBeNull();
  });

  it('should return default message when no params are provided', () => {
    const errors: ValidationErrors = {
      someField: {
        message: 'Default error message',
      },
    };

    const result = service.getMessage(errors);
    expect(result).toBe('Default error message');
  });

  it('should return default message when params have no id', () => {
    const errors: ValidationErrors = {
      someField: {
        message: 'Default error message',
        params: {} as ValidationErrorParams,
      },
    };

    const result = service.getMessage(errors);
    expect(result).toBe('Default error message');
  });

  it('should translate minLength error with parameters', () => {
    const expectedTranslation = 'Enter at least 5 characters';
    spyOn(i18next, 't').and.returnValue(expectedTranslation);

    const errors: ValidationErrors = {
      someField: {
        message: 'Default message',
        params: {
          id: ValidationErrorId.minLength,
          minLength: 5,
        },
      },
    };

    const result = service.getMessage(errors);

    expect(i18next.t).toHaveBeenCalledWith('validation-error.min-length', {
      id: ValidationErrorId.minLength,
      minLength: 5,
    });
    expect(result).toBe(expectedTranslation);
  });

  it('should translate maxLength error with parameters', () => {
    const expectedTranslation = 'Enter no more than 10 characters';
    spyOn(i18next, 't').and.returnValue(expectedTranslation);

    const errors: ValidationErrors = {
      someField: {
        message: 'Default message',
        params: {
          id: ValidationErrorId.maxLength,
          maxLength: 10,
        },
      },
    };

    const result = service.getMessage(errors);

    expect(i18next.t).toHaveBeenCalledWith('validation-error.max-length', {
      id: ValidationErrorId.maxLength,
      maxLength: 10,
    });
    expect(result).toBe(expectedTranslation);
  });

  it('should return default message for unknown error id', () => {
    const unknownErrorId = 'unknownError' as ValidationErrorId;
    const defaultMessage = 'Default error message';

    const errors: ValidationErrors = {
      someField: {
        message: defaultMessage,
        params: {
          id: unknownErrorId,
        } as ValidationErrorParams,
      },
    };

    const result = service.getMessage(errors);
    expect(result).toBe(defaultMessage);
  });

  it('should return defaultMessage from params if provided', () => {
    const defaultMessage = 'Custom default message';

    const errors: ValidationErrors = {
      someField: {
        message: 'Original message',
        params: {
          id: ValidationErrorId.minLength,
          defaultMessage: defaultMessage,
          minLength: 5,
        },
      },
    };

    const result = service.getMessage(errors);
    expect(result).toBe(defaultMessage);
  });
});
