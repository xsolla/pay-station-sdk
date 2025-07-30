import { ValidationErrorId } from './validation-error-id.enum';

export const validationErrorKeyMap = new Map<ValidationErrorId, string>([
  [ValidationErrorId.birthDatePattern, 'validation-error.birth-date-pattern'],
  [ValidationErrorId.expirationLength, 'validation-error.expiration-length'],
  [
    ValidationErrorId.expirationMonthPattern,
    'validation-error.expiration-month-pattern',
  ],
  [
    ValidationErrorId.expirationMinMonth,
    'validation-error.expiration-min-month',
  ],
  [
    ValidationErrorId.expirationMaxMonth,
    'validation-error.expiration-max-month',
  ],
  [
    ValidationErrorId.expirationYearPattern,
    'validation-error.expiration-year-pattern',
  ],
  [ValidationErrorId.expirationMinYear, 'validation-error.expiration-min-year'],
  [ValidationErrorId.expirationMaxYear, 'validation-error.expiration-max-year'],
  [ValidationErrorId.couponPattern, 'validation-error.coupon-pattern'],
  [ValidationErrorId.emailPattern, 'validation-error.email-pattern'],
  [ValidationErrorId.cardNumberPattern, 'validation-error.card-number-pattern'],
  [ValidationErrorId.required, 'validation-error.required'],
  [ValidationErrorId.minLength, 'validation-error.min-length'],
  [ValidationErrorId.maxLength, 'validation-error.max-length'],
  [ValidationErrorId.cpfNumberPattern, 'validation-error.cpf-number-pattern'],
  [ValidationErrorId.cvvPattern, 'validation-error.cvv-pattern'],
  [ValidationErrorId.phonePattern, 'validation-error.phone-pattern'],
  [
    ValidationErrorId.buildingNumberPattern,
    'validation-error.building-number-pattern',
  ],
  [ValidationErrorId.zipPattern, 'validation-error.zip-pattern'],
  [ValidationErrorId.dataPattern, 'validation-error.data-pattern'],
]);
