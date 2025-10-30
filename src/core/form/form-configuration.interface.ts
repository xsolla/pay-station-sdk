import { cardPid } from '../../features/headless-checkout/web-components/payment-methods/variables';
import { XpsBoolean } from '../xps-boolean.enum';
import { PaymentConfigurationApplePaySettings } from './types/apple-pay-form-configuration.interface';
import { PaymentConfigurationCreditCardSettings } from './types/credit-card-form-configuration.interface';
import { PaymentConfigurationGooglePaySettings } from './types/google-pay-form-configuration.interface';

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

interface PaymentConfigurationWithGeneralSettings
  extends BasePaymentConfiguration {
  paymentMethodId: Exclude<number, typeof cardPid>;
  paymentMethodSettings?: never;
}

export type FormConfiguration =
  | PaymentConfigurationCreditCardSettings
  | PaymentConfigurationGooglePaySettings
  | PaymentConfigurationApplePaySettings
  | PaymentConfigurationWithGeneralSettings;
