import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';
import { isUpdateCreditCardTypeMessage } from '../../../core/guards/update-credit-card-type.guard';

export const updateCreditCardTypeHandler: Handler<{ cardType: string }> = (
  message: Message,
): { isHandled: boolean; value?: { cardType: string } } | null => {
  if (isUpdateCreditCardTypeMessage(message)) {
    return {
      isHandled: true,
      value: message.data,
    };
  }

  return null;
};
