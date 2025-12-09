import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { isOpenApplePayPageEventMessage } from '../../../../core/guards/apple-pay/open-apple-pay-page.guard';

export const openApplePayPageHandler: Handler<
  { redirectUrl: string } | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: { redirectUrl: string } | null | undefined;
} | null => {
  if (!isOpenApplePayPageEventMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
