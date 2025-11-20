import { Message } from '../../message.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';

export const isGooglePayWindowOpenedEventMessage = (
  messageData: unknown,
): messageData is Message<null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.googlePayWindowOpened;
  }
  return false;
};
