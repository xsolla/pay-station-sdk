import { Message } from './message.interface';

export type Handler<T> = (
  data: Message
) => { isHandled: boolean; value?: T } | null;
