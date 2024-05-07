import { CheckStatusAction } from './check-status.action.type';
import { RedirectAction } from './redirect/redirect.action.type';
import { ShowErrorsAction } from './show-errors.action.type';
import { ShowFieldsAction } from './show-fields.action.type';
import { StatusUpdatedAction } from './status-updated.action.type';
import { ThreeDsAction } from './three-ds/three-ds.action.type';
import { SpecialButtonAction } from './special-button.action.type';
import { ShowQrCodeAction } from './show-qr-code.action.type';
import { ShowMobilePaymentScreenAction } from './show-mobile-payment-screen.action.type';
import { HideFormAction } from './hide-form.action.type';
import { ShowCashPaymentAction } from './show-cash-payment.action.type';

export type NextAction =
  | CheckStatusAction
  | ShowFieldsAction
  | StatusUpdatedAction
  | ShowErrorsAction
  | RedirectAction
  | ThreeDsAction
  | SpecialButtonAction
  | ShowQrCodeAction
  | ShowMobilePaymentScreenAction
  | HideFormAction
  | ShowCashPaymentAction;
