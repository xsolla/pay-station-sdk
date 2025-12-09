import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { Balance } from '../../../core/balance.interface';
import { isUserBalanceValueEventMessage } from '../../../core/guards/user-balance-value-event-message.guard';

export const getUserBalanceValueHandler: Handler<Balance | null | undefined> = (
  message: Message,
): { isHandled: boolean; value: Balance | null | undefined } | null => {
  if (!isUserBalanceValueEventMessage(message)) {
    return null;
  }

  const userBalance = message.data;
  return {
    isHandled: true,
    value: userBalance,
  };
};
