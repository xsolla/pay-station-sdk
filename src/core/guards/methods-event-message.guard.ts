import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { PaymentMethod } from '../../core/payment-method.interface';

export const isMethodsEventMessage = (
  messageData: unknown,
): messageData is Message<{ methods: PaymentMethod[] }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getPaymentMethodsList ||
      (messageData.name === EventName.getPaymentQuickMethods &&
        (messageData.data as { [key: string]: unknown })?.methods !== undefined)
    );
  }
  return false;
};
