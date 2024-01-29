import { EventName } from '../../core/event-name.enum';
import { isUserBalanceValueEventMessage } from './user-balance-value-event-message.guard';

describe('User balance value event message guard', () => {
  it('Should return true', () => {
    const isUserBalanceMessage = isUserBalanceValueEventMessage({
      name: EventName.getUserBalanceValue,
      data: { amount: 10, currency: 'USD' },
    });

    expect(isUserBalanceMessage).toBeTruthy();
  });

  it('Should return false', () => {
    const isUserBalanceMessage = isUserBalanceValueEventMessage({
      name: EventName.initPayment,
    });

    expect(isUserBalanceMessage).toBeFalsy();
  });
});
