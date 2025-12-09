import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { isApplePayErrorEventMessage } from '../../../../core/guards/apple-pay/apple-pay-error.guard';

export const applePayErrorHandler: Handler<
  { error: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { error: string } | null | undefined;
} | null => {
  if (!isApplePayErrorEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
