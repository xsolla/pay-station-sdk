import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';

export const publicControlChangeState: Handler<void> = (
  message: Message,
): { isHandled: boolean } | null => {
  if (message.name === EventName.publicControlChangeState) {
    return {
      isHandled: true,
    };
  }
  return null;
};

export const publicControlOnValueChanges: Handler<void> = (
  message: Message,
): { isHandled: boolean } | null => {
  if (message.name === EventName.publicControlOnValueChanges) {
    return {
      isHandled: true,
    };
  }
  return null;
};
