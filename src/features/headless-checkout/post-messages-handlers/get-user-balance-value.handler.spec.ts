import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { Balance } from '../../../core/balance.interface';
import { getUserBalanceValueHandler } from './get-user-balance-value.handler';

const mockBalance: Balance = {
  amount: 10,
  currency: 'USD',
};

const mockMessage: Message<Balance | null | undefined> = {
  name: EventName.getUserBalanceValue,
  data: {
    amount: 10,
    currency: 'USD',
  },
};

describe('getUserBalanceValueHandler', () => {
  it('Should handle data', () => {
    expect(getUserBalanceValueHandler(mockMessage)).toEqual({
      isHandled: true,
      value: mockBalance,
    });
  });
  it('Should return null', () => {
    expect(
      getUserBalanceValueHandler({ name: EventName.getSavedMethods }),
    ).toBeNull();
  });
});
