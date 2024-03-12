import { EventName } from '../../../../../core/event-name.enum';
import { Message } from '../../../../../core/message.interface';
import { PaymentMethod } from '../../../../../core/payment-method.interface';
import { defaultSubmitButtonHandler } from './default-submit-button.handler';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.submitForm,
  data: { methods: [] },
};
describe('submitButtonHandler', () => {
  it('Should handle data', () => {
    expect(defaultSubmitButtonHandler(mockMessage)).toEqual({
      isHandled: true,
    });
  });
  it('Should return null', () => {
    expect(
      defaultSubmitButtonHandler({ name: EventName.initPayment })
    ).toBeNull();
  });
});
