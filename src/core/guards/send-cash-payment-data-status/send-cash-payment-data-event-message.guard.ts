import { Message } from '../../message.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';
import { SendCashPaymentDataStatus } from '../../send-cash-payment-data-status.interface';

export const isSentCashPaymentDataStatus = (
  messageData: unknown,
): messageData is Message<SendCashPaymentDataStatus | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.sendCashPaymentDataStatus;
  }
  return false;
};
