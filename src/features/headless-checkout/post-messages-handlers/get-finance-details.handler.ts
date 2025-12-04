import { FinanceDetails } from '../../../core/finance-details/finance-details.interface';
import { isFinanceDetailsEventMessage } from '../../../core/guards/finance-details-message.guard';
import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';

export const getFinanceDetailsHandler: Handler<FinanceDetails | null> = (
  message: Message,
): { isHandled: boolean; value?: FinanceDetails | null } | null => {
  if (isFinanceDetailsEventMessage(message)) {
    return {
      isHandled: true,
      value: message.data,
    };
  }
  return null;
};
