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
import { QrCodeComponent } from '../../features/headless-checkout/web-components/qr-code/qr-code.component';
import { ApplePayComponent } from '../../features/headless-checkout/web-components/apple-pay/apple-pay.component';
import { DefaultSubmitButtonComponent } from '../../features/headless-checkout/web-components/submit-button/default-submit-button/default-submit-button.component';
import { TotalComponent } from '../../features/headless-checkout/web-components/finance-details/total.component';
import { CashPaymentInstructionComponent } from '../../features/headless-checkout/web-components/cash-payment-instruction/cash-payment-instruction.component';
import { XsollaNumberComponent } from '../../features/headless-checkout/web-components/xsolla-number/xsolla-number.component';
import { LegalTermsComponent } from '../../features/headless-checkout/web-components/legal/terms/legal-terms.component';
import { LegalCookiesComponent } from '../../features/headless-checkout/web-components/legal/cookies/legal-cookies.component';
import { LegalMorComponent } from '../../features/headless-checkout/web-components/legal/mor/legal-mor.component';
import { LegalSupportComponent } from '../../features/headless-checkout/web-components/legal/support/legal-support.component';
import { LegalLinksComponent } from '../../features/headless-checkout/web-components/legal/links/legal-links.component';
import { SecureConnectionComponent } from '../../features/headless-checkout/web-components/secure-connection/secure-connection.component';
import { CartItemComponent } from '../../features/headless-checkout/web-components/finance-details/cart-item/cart-item.component';

export const webComponents: {
  [key in WebComponentTagName]: CustomElementConstructor;
} = {
  [WebComponentTagName.TextComponent]: TextComponent,
  [WebComponentTagName.SubmitButtonComponent]: SubmitButtonComponent,
  [WebComponentTagName.PaymentMethodsComponent]: PaymentMethodsComponent,
  [WebComponentTagName.SavedMethodsComponent]: SavedMethodsComponent,
  [WebComponentTagName.PriceTextComponent]: PriceTextComponent,
  [WebComponentTagName.FinanceDetailsComponent]: FinanceDetailsComponent,
  [WebComponentTagName.TotalComponent]: TotalComponent,
  [WebComponentTagName.CartItem]: CartItemComponent,
  [WebComponentTagName.LegalComponent]: LegalComponent,
  [WebComponentTagName.LegalTermsComponent]: LegalTermsComponent,
  [WebComponentTagName.LegalCookiesComponent]: LegalCookiesComponent,
  [WebComponentTagName.LegalMorComponent]: LegalMorComponent,
  [WebComponentTagName.LegalSupportComponent]: LegalSupportComponent,
  [WebComponentTagName.LegalLinksComponent]: LegalLinksComponent,
  [WebComponentTagName.SecureConnectionComponent]: SecureConnectionComponent,
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
  [WebComponentTagName.QrCodeComponent]: QrCodeComponent,
  [WebComponentTagName.ApplePayComponent]: ApplePayComponent,
  [WebComponentTagName.DefaultSubmitButtonComponent]:
    DefaultSubmitButtonComponent,
  [WebComponentTagName.CashPaymentInstructionComponent]:
    CashPaymentInstructionComponent,
  [WebComponentTagName.XsollaNumberComponent]: XsollaNumberComponent,
};
