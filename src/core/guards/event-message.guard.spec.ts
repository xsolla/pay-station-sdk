import 'reflect-metadata';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';

describe('Event message type guard', () => {
  it('Should return true', () => {
    expect(isEventMessage({ name: EventName.initPayment })).toBeTruthy();
  });
  it('Should return false', () => {
    expect(isEventMessage({})).toBeFalsy();
  });
});
