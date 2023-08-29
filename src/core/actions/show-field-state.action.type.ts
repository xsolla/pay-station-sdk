import { Action } from './action.interface';

enum FieldStatus {
  valid = 'VALID',
  invalid = 'INVALID',
  pending = 'PENDING',
  disabled = 'DISABLED',
}

export type ShowFieldStateActionType = 'show_field_state';

export interface ShowFieldStateActionData {
  fieldName: string;
  fieldState: FieldStatus;
  error: { code: string; message: string } | null;
  isFocused?: boolean;
}

export type ShowFieldStateAction = Action<
  ShowFieldStateActionType,
  ShowFieldStateActionData
>;
