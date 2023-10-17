import { Action } from '../action.interface';
import { CheckoutForm } from './checkout-form.interface';

export type ThreeDsActionType = '3DS';

export interface ThreeDsActionData {
  type: 'challenge';
  data: CheckoutForm;
}

export type ThreeDsAction = Action<ThreeDsActionType, ThreeDsActionData>;
