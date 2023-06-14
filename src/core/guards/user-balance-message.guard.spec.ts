import { EventName } from '../../core/event-name.enum';
import { isUserBalanceEventMessage } from './user-balance-event-message.guard';

describe('User balance event message guard', () => {
  it('Should return true', () => {
    const isUserBalanceMessage = isUserBalanceEventMessage({
      name: EventName.getUserBalance,
      data: {
        userBalance: {
          isEnoughUserBalance: false,
          isEnoughUserRecurrentBalance: false,
        },
      },
    });

    expect(isUserBalanceMessage).toBeTruthy();
  });

  it('Should return false', () => {
    const isUserBalanceMessage = isUserBalanceEventMessage({
      name: EventName.initPayment,
    });

    expect(isUserBalanceMessage).toBeFalsy();
  });
});
