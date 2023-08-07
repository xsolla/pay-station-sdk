import { Action } from './action.interface';
import { StatusEnum } from '../status/status.enum';

export type StatusUpdatedActionType = 'status_updated';

export interface StatusUpdatedActionData {
  statusState: StatusEnum;
  group: string;
  isCanceled?: boolean;
  isSuccess?: boolean;
  invoice?: number;
}

export type StatusUpdatedAction = Action<
  StatusUpdatedActionType,
  StatusUpdatedActionData
>;
