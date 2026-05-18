import { FormError } from '../form/form-error.interface';
import { Action } from './action.interface';

export type ShowInitFormActionType = 'show_init_form';

export interface ShowInitFormActionData {
  errors: FormError[] | null;
}

export type ShowInitFormAction = Action<
  ShowInitFormActionType,
  ShowInitFormActionData
>;
