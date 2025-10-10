import { Action } from './action.interface';
import { StatusEnum } from '../status/status.enum';
import { SavePaymentMethodStatus } from './save-payment-method-status.enum';

export type StatusUpdatedActionType = 'status_updated';

export interface StatusUpdatedActionData {
  statusState: StatusEnum;
  group: string;
  isCanceled?: boolean;
  isSuccess?: boolean;
  invoice?: number;
  email?: string;
  isSavePaymentMethodMode?: boolean;
  savePaymentMethodStatus?: SavePaymentMethodStatus;
}

export type StatusUpdatedAction = Action<
  StatusUpdatedActionType,
  StatusUpdatedActionData
>;
