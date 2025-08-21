import { cardPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';
import { BasePaymentConfiguration } from '../form-configuration.interface';

interface SpecialPaymentSettingsBase {
  useSingleExpirationDateField?: boolean;
}

type SpecialPaymentSettings = SpecialPaymentSettingsBase & {
  useExternalVault?: false;
  isPaymentViaSavedMethod?: never;
};

type SpecialPaymentSettingsWithVault = SpecialPaymentSettingsBase & {
  useExternalVault: true;
  isPaymentViaSavedMethod: boolean;
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
