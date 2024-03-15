import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { CombinedPaymentMethods } from '../combined-payment-methods.interface';

export const isCombinedMethodsEventMessage = (
  messageData: unknown,
): messageData is Message<{
  combinedPaymentMethods: CombinedPaymentMethods;
}> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getCombinedPaymentMethods &&
      !!(
        messageData.data as {
          [key: string]: unknown;
        }
      )?.combinedPaymentMethods
    );
  }
  return false;
};
