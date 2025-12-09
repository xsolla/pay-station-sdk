import { applePayErrorHandler } from './apple-pay-error.handler';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';

const mockMessage: Message<{ error: string } | null | undefined> = {
  name: EventName.applePayError,
  data: {
    error: 'error',
  },
};

describe('applePayErrorHandler', () => {
  it('Should handle data', () => {
    expect(applePayErrorHandler(mockMessage)).toEqual({
      isHandled: true,
      value: {
        error: 'error',
      },
    });
  });
  it('Should return null', () => {
    expect(
      applePayErrorHandler({ name: EventName.getSavedMethods }),
    ).toBeNull();
  });
});
