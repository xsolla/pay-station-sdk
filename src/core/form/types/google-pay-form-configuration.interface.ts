import { BasePaymentConfiguration } from '../form-configuration.interface';
import { googlePayPid } from '../../../features/headless-checkout/web-components/payment-methods/variables';

export type PaymentConfigurationGooglePaySettings = BasePaymentConfiguration & {
  paymentMethodId: typeof googlePayPid;
  paymentMethodSettings: {
    useSdkHandlerForUserBackRedirect?: boolean;
  };
};
