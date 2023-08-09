import { EventName } from '../event-name.enum';
import { isGetPaymentStatusMessage } from './get-payment-status-message.guard';

describe('GetPaymentStatus event message guard', () => {
  it('Should return true', () => {
    const isCorrectEvent = isGetPaymentStatusMessage({
      name: EventName.getPaymentStatus,
    });

    expect(isCorrectEvent).toBeTruthy();
  });
  it('Should return false', () => {
    const isWrongEvent = isGetPaymentStatusMessage({
      name: EventName.initPayment,
    });

    expect(isWrongEvent).toBeFalsy();
  });
});
