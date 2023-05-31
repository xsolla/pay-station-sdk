import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { getErrorHandler } from './error.handler';

const mockMessage: Message<{ error: string }> = {
  name: EventName.error,
  data: { error: 'error' },
};

const emptyErrorMessage: Message<{ error: string }> = {
  name: EventName.error,
};

describe('getErrorHandler', () => {
  test('Should handle data', () => {
    expect(getErrorHandler(mockMessage)).toEqual({
      isHandled: true,
      value: 'error',
    });
  });
  test('Should set default error text', () => {
    expect(getErrorHandler(emptyErrorMessage)).toEqual({
      isHandled: true,
      value: 'Unknown error',
    });
  });
  test('Should return null', () => {
    expect(getErrorHandler({ name: EventName.initPayment })).toBeNull();
  });
});
