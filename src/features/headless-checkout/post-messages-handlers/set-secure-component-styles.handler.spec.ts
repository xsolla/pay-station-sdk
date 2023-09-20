import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { PaymentMethod } from '../../../core/payment-method.interface';
import { setSecureComponentStylesHandler } from './set-secure-component-styles.handler';

const mockMessage: Message<{ methods: PaymentMethod[] }> = {
  name: EventName.setSecureComponentStyles,
};

describe('setSecureComponentStylesHandler', () => {
  it('Should handle data', () => {
    expect(setSecureComponentStylesHandler(mockMessage)).toEqual({
      isHandled: true,
    });
  });

  it('Should return null', () => {
    expect(
      setSecureComponentStylesHandler({
        name: EventName.getPaymentMethodsList,
      }),
    ).toBeNull();
  });
});
