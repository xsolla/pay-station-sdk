import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isFinishLoadComponentEventMessage } from '../../../core/guards/finish-load-component.guard';

export const finishLoadComponentHandler: Handler<
  { fieldName: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { fieldName: string } | null | undefined;
} | null => {
  if (!isFinishLoadComponentEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
