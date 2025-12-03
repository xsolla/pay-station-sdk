import { Message } from '../../../../core/message.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { isGooglePayButtonClickedEventMessage } from '../../../../core/guards/google-pay/google-pay-button-clicked.guard';

export const googlePayButtonClickedHandler: Handler<null | undefined> = (
  message: Message,
): {
  isHandled: boolean;
  value: null | undefined;
} | null => {
  if (!isGooglePayButtonClickedEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
