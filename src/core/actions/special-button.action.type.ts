import { Action } from './action.interface';

export type SpecialButtonActionType = 'special_button';

export enum SpecialButtonName {
  googlePay = 'google-pay',
}

export interface SpecialButtonActionData {
  buttonName: SpecialButtonName;
}

export type SpecialButtonAction = Action<
  SpecialButtonActionType,
  SpecialButtonActionData
>;
