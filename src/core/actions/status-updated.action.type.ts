import { Action } from './action.interface';

export type StatusUpdatedActionType = 'status_updated';

export enum StatusEnum {
  created = 'created',
  awaiting = 'awaiting',
  processing = 'processing',
  authorized = 'authorized',
  held = 'held',
  done = 'done',
  error = 'error',
  canceled = 'canceled',
}
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
