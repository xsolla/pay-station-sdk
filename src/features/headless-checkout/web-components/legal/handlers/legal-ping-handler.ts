import { Handler } from '../../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../../core/message.interface';
import { EventName } from '../../../../../core/event-name.enum';

export const legalPingHandler: Handler<void> = (
  message: Message
): { isHandled: boolean } | null => {
  console.log(message);
  if (message.name === EventName.legalComponentPing) {
    return {
      isHandled: true,
    };
  }
  return null;
};
