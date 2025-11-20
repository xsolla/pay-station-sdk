import { Message } from '../../../../core/message.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { isApplePayButtonClickedEventMessage } from '../../../../core/guards/apple-pay/apple-pay-button-clicked.guard';

export const applePayButtonClickedHandler: Handler<null | undefined> = (
  message: Message,
): {
  isHandled: boolean;
  value: null | undefined;
} | null => {
  if (!isApplePayButtonClickedEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
