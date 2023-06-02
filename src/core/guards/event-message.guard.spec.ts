import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';

describe('Event message type guard', () => {
  test('Should return true', () => {
    expect(isEventMessage({ name: EventName.initPayment })).toBeTruthy();
  });
  test('Should return false', () => {
    expect(isEventMessage({})).toBeFalsy();
  });
});
