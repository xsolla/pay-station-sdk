import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { isApplePayQrClosedEventMessage } from '../../../../core/guards/apple-pay/apple-pay-qr-closed.guard';

export const applePayQrClosedHandler: Handler<
  { error: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { error: string } | null | undefined;
} | null => {
  if (!isApplePayQrClosedEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
