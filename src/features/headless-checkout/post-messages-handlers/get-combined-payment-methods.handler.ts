import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isCombinedMethodsEventMessage } from '../../../core/guards/combined-payment-methods-event-message.guard';
import { CombinedPaymentMethods } from '../../../core/combined-payment-methods.interface';

export const getCombinedPaymentMethodsHandler: Handler<
  CombinedPaymentMethods
> = (
  message: Message,
): { isHandled: boolean; value: CombinedPaymentMethods } | null => {
  if (!isCombinedMethodsEventMessage(message)) {
    return null;
  }

  const combinedPaymentMethods = message.data?.combinedPaymentMethods;
  return {
    isHandled: true,
    value: combinedPaymentMethods as unknown as CombinedPaymentMethods,
  };
};
