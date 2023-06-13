import { EventName } from '../event-name.enum';
import { isErrorEventMessage } from './error-event-message.guard';

describe('Error event message type guard', () => {
  it('Should return true', () => {
    expect(isErrorEventMessage({ name: EventName.error })).toBeTruthy();
  });
  it('Should return false', () => {
    expect(isErrorEventMessage({})).toBeFalsy();
  });
});
