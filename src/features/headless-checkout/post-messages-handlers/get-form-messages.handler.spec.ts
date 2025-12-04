import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { getFormMessagesHandler } from './get-form-messages.handler';

const mockMessages: string[] = ['message'];

const mockMessage: Message<string[] | null | undefined> = {
  name: EventName.formMessagesChanged,
  data: ['message'],
};

describe('getFormMessagesHandler', () => {
  it('Should handle data', () => {
    expect(getFormMessagesHandler(mockMessage)).toEqual({
      isHandled: true,
      value: mockMessages,
    });
  });
  it('Should return null', () => {
    expect(
      getFormMessagesHandler({ name: EventName.getSavedMethods }),
    ).toBeNull();
  });
});
