import { Handler } from '../../../core/post-messages-client/handler.type';
import { PaymentMethod } from '../../../core/payment-method.interface';
import { Message } from '../../../core/message.interface';
import { isMethodsEventMessage } from '../../../core/guards/methods-event-message.guard';
import { EventName } from '../../../core/event-name.enum';

export const getQuickMethodsHandler: Handler<PaymentMethod[]> = (
  message: Message,
): { isHandled: boolean; value: PaymentMethod[] } | null => {
  if (
    isMethodsEventMessage(message) &&
    message.name === EventName.getPaymentQuickMethods
  ) {
    const methods = message.data?.methods;
    return {
      isHandled: true,
      value: methods ?? [],
    };
  }
  return null;
};
