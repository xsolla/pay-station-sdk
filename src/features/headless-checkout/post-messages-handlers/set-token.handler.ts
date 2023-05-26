import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/post-messages-client/message.interface';
import { EventName } from '../../../core/post-messages-client/event-name.enum';

export const setTokenHandler: Handler<void> = (
  message: Message
): { isHandled: boolean } | null => {
  if (message.name === EventName.initPayment) {
    return {
      isHandled: true,
    };
  }
  return null;
};
