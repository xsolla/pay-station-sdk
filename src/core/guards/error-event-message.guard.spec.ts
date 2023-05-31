import { EventName } from '../event-name.enum';
import { isErrorEventMessage } from './error-event-message.guard';

describe('Error event message type guard', () => {
  test('Should return true', () => {
    expect(isErrorEventMessage({ name: EventName.error })).toBeTruthy();
  });
  test('Should return false', () => {
    expect(isErrorEventMessage({})).toBeFalsy();
  });
});
