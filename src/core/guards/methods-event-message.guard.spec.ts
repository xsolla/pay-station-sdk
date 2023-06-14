import { EventName } from '../../core/event-name.enum';
import { isMethodsEventMessage } from './methods-event-message.guard';

describe('Methods event message guard', () => {
  it('Should return true', () => {
    const isPaymentMethodsMessage = isMethodsEventMessage({
      name: EventName.getPaymentMethodsList,
      data: { methods: [] },
    });

    expect(isPaymentMethodsMessage).toBeTruthy();
  });
  it('Should return false', () => {
    const isPaymentMethodsMessage = isMethodsEventMessage({
      name: EventName.initPayment,
    });

    expect(isPaymentMethodsMessage).toBeFalsy();
  });
});
