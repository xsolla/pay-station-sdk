import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isCloseExternalWindowMessage } from '../../../core/guards/close-external-window.guard';

export interface CloseExternalWindowData {
  closedByUser?: boolean;
}

export const closeExternalWindowHandler: Handler<
  CloseExternalWindowData | null
> = (
  message: Message,
): {
  isHandled: boolean;
  value: CloseExternalWindowData | null;
} | null => {
  if (!isCloseExternalWindowMessage(message)) {
    return null;
  }

  const data = message.data as CloseExternalWindowData | undefined;

  return {
    isHandled: true,
    value: {
      closedByUser: data?.closedByUser ?? false,
    },
  };
};
