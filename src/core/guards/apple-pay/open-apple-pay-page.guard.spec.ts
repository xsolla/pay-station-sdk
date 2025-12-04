import 'reflect-metadata';
import { EventName } from '../../event-name.enum';
import { isOpenApplePayPageEventMessage } from './open-apple-pay-page.guard';

describe('Event message type guard', () => {
  it('Should return true', () => {
    expect(
      isOpenApplePayPageEventMessage({ name: EventName.openApplePayPage }),
    ).toBeTruthy();
  });
  it('Should return false', () => {
    expect(isOpenApplePayPageEventMessage({})).toBeFalsy();
  });
});
