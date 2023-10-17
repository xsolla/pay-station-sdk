import { Action } from '../action.interface';
import { ThreeDsAction } from './three-ds.action.type';

export const isThreeDsAction = (
  value: Action<unknown, unknown>,
): value is ThreeDsAction => {
  return value.type === '3DS';
};
