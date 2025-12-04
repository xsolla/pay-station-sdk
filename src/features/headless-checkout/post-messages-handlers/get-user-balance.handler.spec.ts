import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { UserBalance } from '../../../core/user-balance.interface';
import { getUserBalanceHandler } from './get-user-balance.handler';

const mockUserBalance: UserBalance = {
  isEnoughUserBalance: true,
  isEnoughUserRecurrentBalance: false,
};

const mockMessage: Message<{ userBalance: UserBalance }> = {
  name: EventName.getUserBalance,
  data: {
    userBalance: mockUserBalance,
  },
};
describe('getUserBalanceHandler', () => {
  it('Should handle data', () => {
    expect(getUserBalanceHandler(mockMessage)).toEqual({
      isHandled: true,
      value: mockUserBalance,
    });
  });
  it('Should return null', () => {
    expect(
      getUserBalanceHandler({ name: EventName.getSavedMethods }),
    ).toBeNull();
  });
});
