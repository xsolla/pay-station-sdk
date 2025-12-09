import { Message } from '../../message.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';

export const isApplePayQrOpenedEventMessage = (
  messageData: unknown,
): messageData is Message<{ error: string } | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.applePayQrOpened;
  }
  return false;
};
