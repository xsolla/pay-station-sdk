import { TextComponent } from '../../features/headless-checkout/web-components/text-component/text.component';
import { SubmitButtonComponent } from '../../features/headless-checkout/web-components/submit-button/submit-button.component';
import { WebComponentTagName } from './web-component-tag-name.enum';
import { PaymentMethodsComponent } from '../../features/headless-checkout/web-components/payment-methods/payment-methods.component';
import { LegalComponent } from '../../features/headless-checkout/web-components/legal/legal.component';
import { FinanceDetailsComponent } from '../../features/headless-checkout/web-components/finance-details/finance-details.component';
import { PriceTextComponent } from '../../features/headless-checkout/web-components/finance-details/price-text/price-text.component';

export const webComponents: {
  [key in WebComponentTagName]: CustomElementConstructor;
} = {
  [WebComponentTagName.TextComponent]: TextComponent,
  [WebComponentTagName.SubmitButtonComponent]: SubmitButtonComponent,
  [WebComponentTagName.PaymentMethodsComponent]: PaymentMethodsComponent,
  [WebComponentTagName.PriceTextComponent]: PriceTextComponent,
  [WebComponentTagName.FinanceDetailsComponent]: FinanceDetailsComponent,
  [WebComponentTagName.LegalComponent]: LegalComponent,
};
