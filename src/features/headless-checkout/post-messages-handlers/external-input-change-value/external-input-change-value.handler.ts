import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';

export const externalInputChangeValueHandler: Handler<void> = (
  message: Message,
): { isHandled: boolean } | null => {
  if (message.name === EventName.externalChangeInputValue) {
    return {
      isHandled: true,
    };
  }
  return null;
};
