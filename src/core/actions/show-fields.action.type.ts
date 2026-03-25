import { Action } from './action.interface';
import { Field } from '../form/field.interface';
import { FormMessage } from '../form/form-message.interface';
import { FormError } from '../form/form-error.interface';

export type ShowFieldsActionType = 'show_fields';
export interface ShowFieldsActionData {
  fields: Field[];
  errors: FormError[] | undefined;
  messages: FormMessage[] | null;
  order?: object;
  submitButtonText?: string;
}
export type ShowFieldsAction = Action<
  ShowFieldsActionType,
  ShowFieldsActionData
>;
