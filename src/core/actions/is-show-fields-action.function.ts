import { Action } from './action.interface';
import { ShowFieldsAction } from './show-fields.action.type';

export const isShowFieldsAction = (
  value: Action<unknown, unknown>,
): value is ShowFieldsAction => {
  return value.type === 'show_fields';
};
