import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';
import { openApplePayPageHandler } from './open-apple-pay-page.handler';

const mockMessage: Message<{ redirectUrl: string } | null | undefined> = {
  name: EventName.openApplePayPage,
  data: {
    redirectUrl: 'url',
  },
};

describe('openApplePayPageHandler', () => {
  it('Should handle data', () => {
    expect(openApplePayPageHandler(mockMessage)).toEqual({
      isHandled: true,
      value: {
        redirectUrl: 'url',
      },
    });
  });
  it('Should return null', () => {
    expect(
      openApplePayPageHandler({ name: EventName.getSavedMethods }),
    ).toBeNull();
  });
});
