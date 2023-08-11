import { TextComponent } from '../../features/headless-checkout/web-components/text-component/text.component';
import { SubmitButtonComponent } from '../../features/headless-checkout/web-components/submit-button/submit-button.component';
import { PaymentMethodsComponent } from '../../features/headless-checkout/web-components/payment-methods/payment-methods.component';
import { LegalComponent } from '../../features/headless-checkout/web-components/legal/legal.component';
import { StatusComponent } from '../../features/headless-checkout/web-components/status/status.component';
import { WebComponentTagName } from './web-component-tag-name.enum';

export const webComponents: {
  [key in WebComponentTagName]: CustomElementConstructor;
} = {
  [WebComponentTagName.TextComponent]: TextComponent,
  [WebComponentTagName.SubmitButtonComponent]: SubmitButtonComponent,
  [WebComponentTagName.PaymentMethodsComponent]: PaymentMethodsComponent,
  [WebComponentTagName.LegalComponent]: LegalComponent,
  [WebComponentTagName.StatusComponent]: StatusComponent,
};
