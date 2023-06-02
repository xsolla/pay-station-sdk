import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { PaymentMethod } from '../../../core/payment-method.interface';
import { getRegularMethodsHandler } from './get-regular-methods.handler';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.getPaymentMethodsList,
  data: { methods: [] },
};
describe('getRegularMethodsHandler', () => {
  test('Should handle data', () => {
    expect(getRegularMethodsHandler(mockMessage)).toEqual({
      isHandled: true,
      value: [],
    });
  });
  test('Should return null', () => {
    expect(
      getRegularMethodsHandler({ name: EventName.initPayment })
    ).toBeNull();
  });
});
