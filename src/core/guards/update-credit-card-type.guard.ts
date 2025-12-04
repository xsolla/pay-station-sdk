import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';

export const isUpdateCreditCardTypeMessage = (
  messageData: unknown,
): messageData is Message<{ cardType: string }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.updateCreditCardType &&
      (messageData.data as { [key: string]: unknown })?.cardType !== undefined
    );
  }
  return false;
};
