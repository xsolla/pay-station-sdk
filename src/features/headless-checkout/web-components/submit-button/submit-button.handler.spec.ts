import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { PaymentMethod } from '../../../../core/payment-method.interface';
import { submitButtonHandler } from './submit-button.handler';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.submitForm,
  data: { methods: [] },
};
describe('submitButtonHandler', () => {
  it('Should handle data', () => {
    expect(submitButtonHandler(mockMessage)).toEqual({
      isHandled: true,
    });
  });
  it('Should return null', () => {
    expect(submitButtonHandler({ name: EventName.initPayment })).toBeNull();
  });
});
