import { PaymentConfigurationGooglePaySettings } from './google-pay-form-configuration.interface';
import { FormConfiguration } from '../form-configuration.interface';
import { googlePayPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';

export const isGooglePaySettingsGuard = (
  settings: FormConfiguration,
): settings is PaymentConfigurationGooglePaySettings => {
  return settings.paymentMethodId === googlePayPid;
};
