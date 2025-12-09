import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { UserBalance } from '../../../core/user-balance.interface';
import { isUserBalanceEventMessage } from '../../../core/guards/user-balance-event-message.guard';

export const getUserBalanceHandler: Handler<UserBalance> = (
  message: Message,
): { isHandled: boolean; value: UserBalance } | null => {
  if (!isUserBalanceEventMessage(message)) {
    return null;
  }

  const userBalance = message.data!.userBalance;
  return {
    isHandled: true,
    value: userBalance,
  };
};
