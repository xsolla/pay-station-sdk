import { CheckStatusAction } from './check-status.action.type';
import { RedirectAction } from './redirect/redirect.action.type';
import { ShowErrorsAction } from './show-errors.action.type';
import { ShowFieldsAction } from './show-fields.action.type';
import { StatusUpdatedAction } from './status-updated.action.type';
import { ThreeDsAction } from './three-ds/three-ds.action.type';
import { SpecialButtonAction } from './special-button.action.type';

export type NextAction =
  | CheckStatusAction
  | ShowFieldsAction
  | StatusUpdatedAction
  | ShowErrorsAction
  | RedirectAction
  | ThreeDsAction
  | SpecialButtonAction;
