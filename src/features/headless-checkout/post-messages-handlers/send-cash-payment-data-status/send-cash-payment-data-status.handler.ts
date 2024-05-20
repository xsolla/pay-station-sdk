import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { isSentCashPaymentDataStatus } from '../../../../core/guards/send-cash-payment-data-status/send-cash-payment-data-event-message.guard';
import { SendCashPaymentDataStatus } from '../../../../core/send-cash-payment-data-status.interface';

export const sendCashPaymentDataStatusHandler: Handler<
  SendCashPaymentDataStatus | null | undefined
> = (
  message: Message,
): {
  isHandled: boolean;
  value: SendCashPaymentDataStatus | null | undefined;
} | null => {
  if (!isSentCashPaymentDataStatus(message)) {
    return null;
  }

  const cashPaymentData = message.data;
  return {
    isHandled: true,
    value: cashPaymentData,
  };
};
