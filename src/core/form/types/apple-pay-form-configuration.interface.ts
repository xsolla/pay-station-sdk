import { BasePaymentConfiguration } from '../form-configuration.interface';
import { applePayPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';

export type PaymentConfigurationApplePaySettings = BasePaymentConfiguration & {
  paymentMethodId: typeof applePayPid;
  paymentMethodSettings: {
    enableExternalWindowOpenMessage?: boolean;
  };
};
