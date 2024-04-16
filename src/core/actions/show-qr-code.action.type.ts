import { Action } from './action.interface';
import { Field } from '../form/field.interface';

export type ShowQrCodeActionType = 'show_qr_code';

export interface ShowQrCodeActionData {
  fields: Field[];
  submitButtonText: string;
}

export type ShowQrCodeAction = Action<
  ShowQrCodeActionType,
  ShowQrCodeActionData
>;
