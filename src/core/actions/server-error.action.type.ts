import { Action } from './action.interface';

export type ServerErrorActionType = 'server_error';

export interface ServerErrorActionData {
  status: number;
  message: string;
}

export type ServerErrorAction = Action<
  ServerErrorActionType,
  ServerErrorActionData
>;

