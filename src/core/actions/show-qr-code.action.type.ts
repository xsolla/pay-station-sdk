import { Action } from './action.interface';

export type ShowQrCodeActionType = 'show_qr_code';

export interface ShowQrCodeActionData {
  submitButtonText: string;
}

export type ShowQrCodeAction = Action<
  ShowQrCodeActionType,
  ShowQrCodeActionData
>;
