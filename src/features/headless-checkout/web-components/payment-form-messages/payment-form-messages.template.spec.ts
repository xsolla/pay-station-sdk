import { getPaymentFormMessagesTemplate } from './payment-form-messages.template';

const mockMessages = ['message1', 'message2'];

describe('getPaymentFormMessagesTemplate', () => {
  it('Should contains payment-form-messages', () => {
    expect(getPaymentFormMessagesTemplate(mockMessages)).toContain(
      'payment-form-messages',
    );
  });
});
