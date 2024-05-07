import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { sendCashPaymentDataStatusHandler } from './send-cash-payment-data-status.handler';

const mockMessage: Message = {
  name: EventName.sendCashPaymentDataStatus,
};
describe('sendCashPaymentDataStatusHandler', () => {
  it('should handle status', () => {
    expect(sendCashPaymentDataStatusHandler(mockMessage)).toEqual({
      isHandled: true,
      value: undefined,
    });
  });

  it('should return null', () => {
    expect(
      sendCashPaymentDataStatusHandler({
        name: EventName.getPaymentMethodsList,
      }),
    ).toBeNull();
  });
});
