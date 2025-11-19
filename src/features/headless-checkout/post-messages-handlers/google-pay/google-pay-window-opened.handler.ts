import { Message } from '../../../../core/message.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { isGooglePayWindowOpenedEventMessage } from '../../../../core/guards/google-pay/google-pay-window-opened.guard';

export const googlePayWindowOpenedHandler: Handler<null | undefined> = (
  message: Message,
): {
  isHandled: boolean;
  value: null | undefined;
} | null => {
  if (!isGooglePayWindowOpenedEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
