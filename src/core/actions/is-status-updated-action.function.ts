import { Action } from './action.interface';
import { StatusUpdatedAction } from './status-updated.action.type';

export const isStatusUpdatedAction = (
  value: Action<unknown, unknown>,
): value is StatusUpdatedAction => {
  return value.type === 'status_updated';
};
