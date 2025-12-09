import { Handler } from '../../../core/post-messages-client/handler.type';
import { PaymentMethod } from '../../../core/payment-method.interface';
import { Message } from '../../../core/message.interface';
import { EventName } from '../../../core/event-name.enum';
import { isMethodsEventMessage } from '../../../core/guards/methods-event-message.guard';

export const getRegularMethodsHandler: Handler<PaymentMethod[]> = (
  message: Message,
): { isHandled: boolean; value: PaymentMethod[] } | null => {
  if (
    isMethodsEventMessage(message) &&
    message.name === EventName.getPaymentMethodsList
  ) {
    const methods = message.data?.methods;
    return {
      isHandled: true,
      value: methods ?? [],
    };
  }
  return null;
};
