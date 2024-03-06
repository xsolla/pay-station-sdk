import { Action } from './action.interface';

export type ShowMobilePaymentScreenActionType = 'show_mobile_payment_screen';

export interface ShowMobilePaymentScreenActionData {
  submitButtonText: string;
}

export type ShowMobilePaymentScreenAction = Action<
  ShowMobilePaymentScreenActionType,
  ShowMobilePaymentScreenActionData
>;
