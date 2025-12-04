import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { UserBalance } from '../user-balance.interface';

export const isUserBalanceEventMessage = (
  messageData: unknown,
): messageData is Message<{ userBalance: UserBalance }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getUserBalance &&
      (messageData.data as { [key: string]: unknown })?.userBalance !==
        undefined
    );
  }
  return false;
};
