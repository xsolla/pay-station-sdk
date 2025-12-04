import { Message } from '../../message.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';

export const isOpenApplePayPageEventMessage = (
  messageData: unknown,
): messageData is Message<{ redirectUrl: string } | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.openApplePayPage;
  }
  return false;
};
