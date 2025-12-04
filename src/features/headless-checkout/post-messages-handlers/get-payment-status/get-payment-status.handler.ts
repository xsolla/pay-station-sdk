import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { Status } from '../../../../core/status/status.interface';
import { isGetPaymentStatusMessage } from '../../../../core/guards/get-payment-status-message.guard';

export const getPaymentStatusHandler: Handler<Status> = (
  message: Message,
): { isHandled: boolean; value?: Status } | null => {
  if (!isGetPaymentStatusMessage(message)) {
    return null;
  }

  return {
    isHandled: true,
    value: message.data,
  };
};
