import { CheckStatusAction } from './check-status.action.type';
import { ShowErrorsAction } from './show-errors.action.type';
import { ShowFieldStateAction } from './show-field-state.action.type';
import { ShowFieldsAction } from './show-fields.action.type';
import { StatusUpdatedAction } from './status-updated.action.type';

export type NextAction =
  | CheckStatusAction
  | ShowFieldsAction
  | StatusUpdatedAction
  | ShowErrorsAction
  | ShowFieldStateAction;
