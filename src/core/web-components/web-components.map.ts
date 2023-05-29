import { CardNumberComponent } from '../../features/headless-checkout/web-components/card-number/card-number.component';
import { SubmitButtonComponent } from '../../features/headless-checkout/web-components/submit-button/submit-button.component';
import { WebComponentTagName } from './web-component-tag-name.enum';

export const webComponents: { [key in WebComponentTagName]: CustomElementConstructor } = {
  [WebComponentTagName.CardNumberComponent]: CardNumberComponent,
  [WebComponentTagName.SubmitButtonComponent]: SubmitButtonComponent
};