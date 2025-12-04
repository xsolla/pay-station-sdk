import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { getPaymentStatusHandler } from './get-payment-status.handler';

const mockMessage: Message = {
  name: EventName.getPaymentStatus,
};
describe('getPaymentStatusHandler', () => {
  it('should handle status', () => {
    expect(getPaymentStatusHandler(mockMessage)).toEqual({
      isHandled: true,
      value: undefined,
    });
  });

  it('should return null', () => {
    expect(
      getPaymentStatusHandler({ name: EventName.getPaymentMethodsList }),
    ).toBeNull();
  });
});
