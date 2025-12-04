import 'reflect-metadata';
import { isApplePayErrorEventMessage } from './apple-pay-error.guard';
import { EventName } from '../../event-name.enum';

describe('Event message type guard', () => {
  it('Should return true', () => {
    expect(
      isApplePayErrorEventMessage({ name: EventName.applePayError }),
    ).toBeTruthy();
  });
  it('Should return false', () => {
    expect(isApplePayErrorEventMessage({})).toBeFalsy();
  });
});
