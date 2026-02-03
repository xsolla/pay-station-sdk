import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../event-name.enum';

export interface CloseExternalWindowMessageData {
  closedByUser?: boolean;
}

export const isCloseExternalWindowMessage = (
  messageData: unknown,
): messageData is Message<
  CloseExternalWindowMessageData | null | undefined
> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.closeExternalWindow;
  }
  return false;
};
