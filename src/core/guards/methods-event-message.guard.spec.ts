import { EventName } from '../../core/event-name.enum';
import { isMethodsEventMessage } from './methods-event-message.guard';

describe('Methods event message guard', () => {
  test('Should return true', () => {
    expect(
      isMethodsEventMessage({
        name: EventName.getPaymentMethodsList,
        data: { methods: [] },
      })
    ).toBeTruthy();
  });
  test('Should return false', () => {
    expect(isMethodsEventMessage({ name: EventName.initPayment })).toBeFalsy();
  });
});
