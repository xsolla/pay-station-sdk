import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isCloseExternalWindowMessage } from '../../../core/guards/close-external-window.guard';

export const closeExternalWindowHandler: Handler<
  { error: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { error: string } | null | undefined;
} | null => {
  if (!isCloseExternalWindowMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: null,
  };
};
