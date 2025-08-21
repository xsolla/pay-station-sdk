import { cardPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';
import { BasePaymentConfiguration } from '../form-configuration.interface';

interface SpecialPaymentSettingsBase {
    useSingleExpirationDateField?: boolean;
}

type SpecialPaymentSettingsWithVault =
    SpecialPaymentSettingsBase & {
    useExternalVault: true;
    isPaymentViaSavedMethod: boolean;
};

type SpecialPaymentSettingsNoVault =
    SpecialPaymentSettingsBase & {
    useExternalVault?: false | undefined;
    isPaymentViaSavedMethod?: never;
};

type PaymentConfigurationCreditCardBase = BasePaymentConfiguration & {
    paymentMethodId: typeof cardPid;
};

type PaymentConfigurationCreditCardWithVault = PaymentConfigurationCreditCardBase & {
    paymentMethodSettings: SpecialPaymentSettingsWithVault;
};

type PaymentConfigurationCreditCardWithoutVault = PaymentConfigurationCreditCardBase & {
    paymentMethodSettings: SpecialPaymentSettingsNoVault;
};

export type PaymentConfigurationCreditCardSettings =
    | PaymentConfigurationCreditCardWithVault
    | PaymentConfigurationCreditCardWithoutVault;
