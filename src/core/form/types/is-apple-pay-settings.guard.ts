import { FormConfiguration } from '../form-configuration.interface';
import { applePayPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';
import { PaymentConfigurationApplePaySettings } from './apple-pay-form-configuration.interface';

export const isApplePaySettingsGuard = (
  settings: FormConfiguration,
): settings is PaymentConfigurationApplePaySettings => {
  return settings.paymentMethodId === applePayPid;
};
