import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isErrorEventMessage } from '../../../core/guards/error-event-message.guard';

export const getErrorHandler: Handler<string> = (
  message: Message,
): { isHandled: boolean; value: string } | null => {
  if (isErrorEventMessage(message)) {
    return {
      isHandled: true,
      value: message.data?.error ?? 'Unknown error',
    };
  }
  return null;
};
