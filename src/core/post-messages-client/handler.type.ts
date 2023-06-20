import { Message } from '../message.interface';

export type Handler<T> = (
  data: Message,
  callback?: () => void
) => { isHandled: boolean; value?: T } | null;
