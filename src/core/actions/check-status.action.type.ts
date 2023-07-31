import { Action } from './action.interface';

export type CheckStatusActionType = 'check_status';

export interface CheckStatusActionData {
  invoice: number;
  signature: string;
  locale: string;
  testProject?: string;
  testPs?: string;
  testXsolla?: string;
  userReturnStatus?: string;
}

export type CheckStatusAction = Action<
  CheckStatusActionType,
  CheckStatusActionData
>;
