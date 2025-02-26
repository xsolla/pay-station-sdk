import { Handler } from '../../../core/post-messages-client/handler.type';
import { NextAction } from '../../../core/actions/next-action.interface';
import { isNextActionEventMessage } from '../../../core/guards/next-action-event-message.guard';
import { Message } from '../../../core/message.interface';

export const nextActionHandler: Handler<NextAction> = (
  message: Message,
  callback?: (args?: unknown) => void,
): { isHandled: boolean; value?: NextAction } | null => {
  if (isNextActionEventMessage(message)) {
    if (typeof callback === 'function') {
      callback(message.data);
    }
    return {
      isHandled: true,
      value: message.data,
    };
  }

  return null;
};
