import { Message } from '../message.interface';

export type Handler<T> = (
  data: Message,
  callback?: (args?: unknown) => void | boolean,
) => { isHandled: boolean; value?: T } | null;
