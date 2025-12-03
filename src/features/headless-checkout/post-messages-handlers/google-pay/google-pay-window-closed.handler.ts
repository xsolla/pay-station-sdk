import { Message } from '../../../../core/message.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { isGooglePayWindowClosedEventMessage } from '../../../../core/guards/google-pay/google-pay-window-closed.guard';

export const googlePayWindowClosedHandler: Handler<null | undefined> = (
  message: Message,
): {
  isHandled: boolean;
  value: null | undefined;
} | null => {
  if (!isGooglePayWindowClosedEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
