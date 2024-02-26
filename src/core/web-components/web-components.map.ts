import { TextComponent } from '../../features/headless-checkout/web-components/text-component/text.component';
import { SubmitButtonComponent } from '../../features/headless-checkout/web-components/submit-button/submit-button.component';
import { PaymentMethodsComponent } from '../../features/headless-checkout/web-components/payment-methods/payment-methods.component';
import { LegalComponent } from '../../features/headless-checkout/web-components/legal/legal.component';
import { StatusComponent } from '../../features/headless-checkout/web-components/status/status.component';
import { FinanceDetailsComponent } from '../../features/headless-checkout/web-components/finance-details/finance-details.component';
import { PriceTextComponent } from '../../features/headless-checkout/web-components/finance-details/price-text/price-text.component';
import { WebComponentTagName } from './web-component-tag-name.enum';
import { PaymentFormComponent } from '../../features/headless-checkout/web-components/payment-form/payment-form.component';
import { CardNumberComponent } from '../../features/headless-checkout/web-components/card-number/card-number.component';
import { ThreeDsComponent } from '../../features/headless-checkout/web-components/three-ds/three-ds.component';
import { PhoneComponent } from '../../features/headless-checkout/web-components/phone-component/phone.component';
import { SelectComponent } from '../../features/headless-checkout/web-components/select/select.component';
import { CheckboxComponent } from '../../features/headless-checkout/web-components/checkbox/checkbox.component';
import { SavedMethodsComponent } from '../../features/headless-checkout/web-components/saved-methods/saved-methods.component';
import { UserBalanceComponent } from '../../features/headless-checkout/web-components/user-balance-component/user-balance-component';
import { PaymentFormMessagesComponent } from '../../features/headless-checkout/web-components/payment-form-messages/payment-form-messages.component';
import { GooglePayButtonComponent } from '../../features/headless-checkout/web-components/pages/google-pay/google-pay-button.component';

export const webComponents: {
  [key in WebComponentTagName]: CustomElementConstructor;
} = {
  [WebComponentTagName.TextComponent]: TextComponent,
  [WebComponentTagName.SubmitButtonComponent]: SubmitButtonComponent,
  [WebComponentTagName.PaymentMethodsComponent]: PaymentMethodsComponent,
  [WebComponentTagName.SavedMethodsComponent]: SavedMethodsComponent,
  [WebComponentTagName.PriceTextComponent]: PriceTextComponent,
  [WebComponentTagName.FinanceDetailsComponent]: FinanceDetailsComponent,
  [WebComponentTagName.LegalComponent]: LegalComponent,
  [WebComponentTagName.StatusComponent]: StatusComponent,
  [WebComponentTagName.PaymentFormComponent]: PaymentFormComponent,
  [WebComponentTagName.CardNumberComponent]: CardNumberComponent,
  [WebComponentTagName.ThreeDsComponent]: ThreeDsComponent,
  [WebComponentTagName.PhoneComponent]: PhoneComponent,
  [WebComponentTagName.SelectComponent]: SelectComponent,
  [WebComponentTagName.CheckboxComponent]: CheckboxComponent,
  [WebComponentTagName.UserBalanceComponent]: UserBalanceComponent,
  [WebComponentTagName.PaymentFormMessages]: PaymentFormMessagesComponent,
  [WebComponentTagName.GooglePayButtonComponent]: GooglePayButtonComponent,
};
