import { cardPid } from '../../features/headless-checkout/web-components/payment-methods/variables';
import { XpsBoolean } from '../xps-boolean.enum';

export interface OverridedField {
  initialValue: XpsBoolean | string;
}

export interface BasePaymentConfiguration {
  paymentMethodId: number;
  returnUrl: string;
  country?: string;
  paymentWithSavedMethod?: boolean;
  savedMethodId?: number;
  savePaymentMethod?: boolean;
  overrideFormFields?: { [key: string]: OverridedField };
}

interface SpecialPaymentSettings {
  useSingleExpirationDateField?: boolean;
}

interface PaymentConfigurationCreditCardSettings
  extends BasePaymentConfiguration {
  paymentMethodId: typeof cardPid;
  paymentMethodSettings: SpecialPaymentSettings;
}

interface PaymentConfigurationWithGeneralSettings
  extends BasePaymentConfiguration {
  paymentMethodId: Exclude<number, typeof cardPid>;
  paymentMethodSettings?: never;
}

export type FormConfiguration =
  | PaymentConfigurationCreditCardSettings
  | PaymentConfigurationWithGeneralSettings;
