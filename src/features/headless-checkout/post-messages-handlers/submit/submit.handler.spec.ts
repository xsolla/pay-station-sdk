import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { PaymentMethod } from '../../../../core/payment-method.interface';
import { submitHandler } from './submit.handler';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.submitForm,
  data: { methods: [] },
};
describe('submitHandler', () => {
  it('Should handle data', () => {
    expect(submitHandler(mockMessage)).toEqual({
      isHandled: true,
    });
  });
  it('Should return null', () => {
    expect(submitHandler({ name: EventName.initPayment })).toBeNull();
  });
});
