import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { isApplePayQrOpenedEventMessage } from '../../../../core/guards/apple-pay/apple-pay-qr-opened.guard';

export const applePayQrOpenedHandler: Handler<
  { error: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { error: string } | null | undefined;
} | null => {
  if (!isApplePayQrOpenedEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
