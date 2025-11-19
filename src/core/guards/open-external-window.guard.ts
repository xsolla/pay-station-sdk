import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../event-name.enum';

export const isOpenExternalWindowMessage = (
  messageData: unknown,
): messageData is Message<{ error: string } | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.openExternalWindow;
  }
  return false;
};
