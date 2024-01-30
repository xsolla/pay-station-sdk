import { EventName } from '../event-name.enum';
import { isFormMessagesEventMessage } from './form-messages.guard';

describe('isFormMessagesEventMessage event message guard', () => {
  it('Should return true for matched event name', () => {
    const isCorrectEvent = isFormMessagesEventMessage({
      name: EventName.formMessagesChanged,
    });

    expect(isCorrectEvent).toBeTruthy();
  });

  it('Should return false for different event name', () => {
    const isWrongEvent = isFormMessagesEventMessage({
      name: EventName.initPayment,
    });

    expect(isWrongEvent).toBeFalsy();
  });

  it('Should return false for message without name', () => {
    const isWrongEvent = isFormMessagesEventMessage({});
    expect(isWrongEvent).toBeFalsy();
  });
});
