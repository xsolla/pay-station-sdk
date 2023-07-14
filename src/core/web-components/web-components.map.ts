import { CardNumberComponent } from '../../features/headless-checkout/web-components/card-number/card-number.component';
import { SubmitButtonComponent } from '../../features/headless-checkout/web-components/submit-button/submit-button.component';
import { WebComponentTagName } from './web-component-tag-name.enum';
import { PaymentMethodsComponent } from '../../features/headless-checkout/web-components/payment-methods/payment-methods.component';
import { LegalComponent } from '../../features/headless-checkout/web-components/legal/legal.component';

export const webComponents: {
  [key in WebComponentTagName]: CustomElementConstructor;
} = {
  [WebComponentTagName.CardNumberComponent]: CardNumberComponent,
  [WebComponentTagName.SubmitButtonComponent]: SubmitButtonComponent,
  [WebComponentTagName.PaymentMethodsComponent]: PaymentMethodsComponent,
  [WebComponentTagName.LegalComponent]: LegalComponent,
};
