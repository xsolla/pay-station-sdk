import { Field } from '../../form/field.interface';
import { FormError } from '../../form/form-error.interface';
import { FormMessage } from '../../form/form-message.interface';
import { Action } from '../action.interface';

export type RedirectActionType = 'redirect';

export interface RedirectActionData {
  fields: Field[];
  errors: FormError[] | null;
  messages: FormMessage[] | undefined;
  invoiceId?: string;
  order?: object;
  redirect: {
    redirectUrl: string;
    isNewWindowRequired?: boolean;
    isSameWindowRequired?: boolean;
    data: object;
  };
}

export type RedirectAction = Action<RedirectActionType, RedirectActionData>;
