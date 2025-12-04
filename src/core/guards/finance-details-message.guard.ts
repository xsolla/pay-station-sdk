import { EventName } from '../../core/event-name.enum';
import { Message } from '../../core/message.interface';
import { FinanceDetails } from '../finance-details/finance-details.interface';
import { isEventMessage } from './event-message.guard';

export const isFinanceDetailsEventMessage = (
  messageData: unknown,
): messageData is Message<FinanceDetails> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.financeDetails;
  }

  return false;
};
