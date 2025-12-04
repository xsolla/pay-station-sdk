import { cardPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';
import { BasePaymentConfiguration } from '../form-configuration.interface';

interface SpecialPaymentSettingsBase {
  useSingleExpirationDateField?: boolean;
}

type SpecialPaymentSettings = SpecialPaymentSettingsBase & {
  useExternalVault?: false;
  /**
   * @deprecated Use transactionInitiationType instead
   */
  isPaymentViaSavedMethod?: never;
  transactionInitiationType?: never;
};

type SpecialPaymentSettingsWithVault = SpecialPaymentSettingsBase & {
  useExternalVault: true;
  /**
   * @deprecated Use transactionInitiationType instead
   */
  isPaymentViaSavedMethod?: boolean;
  transactionInitiationType?: 'COF' | 'OT';
};

type PaymentConfigurationCreditCardBase = BasePaymentConfiguration & {
  paymentMethodId: typeof cardPid;
};

type PaymentConfigurationCreditCard = PaymentConfigurationCreditCardBase & {
  paymentMethodSettings: SpecialPaymentSettings;
};

type PaymentConfigurationCreditCardWithVault =
  PaymentConfigurationCreditCardBase & {
    paymentMethodSettings: SpecialPaymentSettingsWithVault;
  };

export type PaymentConfigurationCreditCardSettings =
  | PaymentConfigurationCreditCard
  | PaymentConfigurationCreditCardWithVault;
