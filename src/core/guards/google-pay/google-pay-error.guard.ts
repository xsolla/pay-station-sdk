import { Message } from '../../message.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';

export const isGooglePayErrorEventMessage = (
  messageData: unknown,
): messageData is Message<{ error: unknown } | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.googlePayError;
  }
  return false;
};
