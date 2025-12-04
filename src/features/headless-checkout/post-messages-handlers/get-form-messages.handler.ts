import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';
import { isFormMessagesEventMessage } from '../../../core/guards/form-messages.guard';

export const getFormMessagesHandler: Handler<string[]> = (
  message: Message,
): { isHandled: boolean; value?: string[] } | null => {
  if (isFormMessagesEventMessage(message)) {
    return {
      isHandled: true,
      value: message.data,
    };
  }
  return null;
};
