import { Message } from '../../../../core/message.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { isGooglePayErrorEventMessage } from '../../../../core/guards/google-pay/google-pay-error.guard';

export const googlePayErrorHandler: Handler<
  { error: unknown } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { error: unknown } | null | undefined;
} | null => {
  if (!isGooglePayErrorEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
