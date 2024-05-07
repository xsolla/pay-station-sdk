import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { CashPaymentType } from '../../web-components/cash-payment-instruction/cash-payment.type';
import { isGetCashPaymentDataEventMessage } from '../../../../core/guards/get-cash-payment-data/get-cash-payment-data-event-message.guard';

export const getCashPaymentDataHandler: Handler<CashPaymentType | null> = (
  message: Message,
): { isHandled: boolean; value: CashPaymentType | null | undefined } | null => {
  if (!isGetCashPaymentDataEventMessage(message)) {
    return null;
  }

  const cashPaymentData = message.data;
  return {
    isHandled: true,
    value: cashPaymentData,
  };
};
