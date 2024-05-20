import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { getCashPaymentDataHandler } from './get-cash-payment-data.handler';

const mockMessage: Message = {
  name: EventName.getCashPaymentData,
};
describe('getCashPaymentDataHandler', () => {
  it('should handle status', () => {
    expect(getCashPaymentDataHandler(mockMessage)).toEqual({
      isHandled: true,
      value: undefined,
    });
  });

  it('should return null', () => {
    expect(
      getCashPaymentDataHandler({ name: EventName.getPaymentMethodsList }),
    ).toBeNull();
  });
});
