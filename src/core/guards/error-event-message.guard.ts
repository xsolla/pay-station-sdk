import { EventName } from '../event-name.enum';
import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';

export const isErrorEventMessage = (
  messageData: unknown,
): messageData is Message<{ error: string }> =>
  isEventMessage(messageData) && messageData.name === EventName.error;
