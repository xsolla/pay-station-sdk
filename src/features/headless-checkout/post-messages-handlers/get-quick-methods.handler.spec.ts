import { EventName } from '../../../core/post-messages-client/event-name.enum';
import { getQuickMethodsHandler } from './get-quick-methods.handler';
import { Message } from '../../../core/post-messages-client/message.interface';
import { PaymentMethod } from '../../../core/payment-method.interface';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.getPaymentQuickMethods,
  data: { methods: [] },
};
describe('getQuickMethodsHandler', () => {
  test('Should handle data', () => {
    expect(getQuickMethodsHandler(mockMessage)).toEqual({
      isHandled: true,
      value: [],
    });
  });
  test('Should return null', () => {
    expect(getQuickMethodsHandler({ name: EventName.initPayment })).toBeNull();
  });
});
