import { FormError } from '../form/form-error.interface';
import { Action } from './action.interface';

export type ShowErrorsActionType = 'show_errors';

export interface ShowErrorsActionData {
  errors: FormError[] | null;
}

export type ShowErrorsAction = Action<
  ShowErrorsActionType,
  ShowErrorsActionData
>;
