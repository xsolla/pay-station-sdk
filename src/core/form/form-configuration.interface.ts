import {cardPid} from '../../features/headless-checkout/web-components/payment-methods/variables';
import {XpsBoolean} from '../xps-boolean.enum';
import {PaymentConfigurationCreditCardSettings} from './types/credit-card-form-configuration.interface';

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
    | PaymentConfigurationWithGeneralSettings;
