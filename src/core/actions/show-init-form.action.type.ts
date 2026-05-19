import { Action } from './action.interface';
import { Field } from '../form/field.interface';
import { FormMessage } from '../form/form-message.interface';
import { FormError } from '../form/form-error.interface';

export type ShowInitFormActionType = 'show_init_form';

export interface ShowInitFormActionData {
  fields: Field[];
  errors: FormError[] | undefined;
  messages: FormMessage[] | null;
}

export type ShowInitFormAction = Action<
  ShowInitFormActionType,
  ShowInitFormActionData
>;
