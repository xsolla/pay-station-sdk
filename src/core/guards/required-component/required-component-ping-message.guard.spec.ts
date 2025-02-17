import { EventName } from '../../../core/event-name.enum';
import { isRequiredComponentPingMessage } from './required-component-ping-message.guard';

describe('RequiredComponentPingMessage type guard', () => {
  it('Should return true', () => {
    expect(
      isRequiredComponentPingMessage({ name: EventName.requiredComponentPing }),
    ).toBeTrue();
  });

  it('Should return false', () => {
    expect(
      isRequiredComponentPingMessage({
        name: EventName.initPayment,
      }),
    ).toBeFalse();
  });
});
