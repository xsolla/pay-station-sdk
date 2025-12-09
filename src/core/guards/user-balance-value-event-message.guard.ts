import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { Balance } from '../balance.interface';

export const isUserBalanceValueEventMessage = (
  messageData: unknown,
): messageData is Message<Balance | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.getUserBalanceValue;
  }
  return false;
};
