import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';

export const xsollaNumberSendHandler: Handler<void> = (
  message: Message,
): { isHandled: boolean } | null => {
  if (message.name === EventName.sendCashPaymentData) {
    return {
      isHandled: true,
    };
  }
  return null;
};
