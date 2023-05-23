import { EventName } from '@core/post-messages-client/event-name.enum';
import { Message } from '@core/post-messages-client/message.interface';
import { PaymentMethod } from '@core/payment-method.interface';
import { setTokenHandler } from './set-token.handler';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.initPayment,
  data: { methods: [] },
};
describe('getRegularMethodsHandler', () => {
  test('Should handle data', () => {
    expect(setTokenHandler(mockMessage)).toEqual({ isHandled: true });
  });
  test('Should return null', () => {
    expect(
      setTokenHandler({ name: EventName.getPaymentMethodsList })
    ).toBeNull();
  });
});
