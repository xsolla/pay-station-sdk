import { Message } from '../../message.interface';
import { CashPaymentData } from '../../cash-payment-data.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';

export const isGetCashPaymentDataEventMessage = (
  messageData: unknown,
): messageData is Message<CashPaymentData | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.getCashPaymentData;
  }
  return false;
};
