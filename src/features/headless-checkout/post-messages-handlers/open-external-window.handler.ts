import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isOpenExternalWindowMessage } from '../../../core/guards/open-external-window.guard';

export const openExternalWindowHandler: Handler<
  { error: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: null;
} | null => {
  if (!isOpenExternalWindowMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: null,
  };
};
