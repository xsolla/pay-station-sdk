import 'reflect-metadata';
import { PostMessagesClient } from './post-messages-client';
import { Message } from '@core/post-messages-client/message.interface';
import { EventName } from '@core/post-messages-client/event-name.enum';
import { Handler } from '@core/post-messages-client/handler.type';
import { container } from 'tsyringe';
import { PaymentMethod } from '@core/payment-method.interface';
import { isMethodsEventMessage } from '../../features/headless-checkout/guards/methods-event-message.guard';

const mockHandler: Handler<PaymentMethod[]> = (
  message: Message
): { isHandled: boolean; value: PaymentMethod[] } | null => {
  if (
    isMethodsEventMessage(message) &&
    message.name === EventName.getPaymentMethodsList
  ) {
    const methods = message.data?.methods;
    return {
      isHandled: true,
      value: methods ?? [],
    };
  }
  return null;
};

const mockPaymentMethod: PaymentMethod = {
  id: 1,
  rank: 1,
  name: 'method',
} as unknown as PaymentMethod;

const mockMessage: Message = {
  name: EventName.getPaymentMethodsList,
  data: {
    methods: [mockPaymentMethod],
  },
};
const recipientUrl = 'https://example.ru';
const mockMessageEvent = {
  origin: recipientUrl,
  data: JSON.stringify(mockMessage),
} as MessageEvent;

describe('PostMessagesClient', () => {
  let postMessagesClient: PostMessagesClient;
  let recipient: HTMLIFrameElement;

  beforeEach(() => {
    recipient = window.document.createElement('iframe');
    postMessagesClient = container
      .createChildContainer()
      .register<Window>(Window, { useValue: window })
      .resolve(PostMessagesClient);
  });

  test('Should throw exception if no recipient', async () => {
    try {
      await postMessagesClient.send(mockMessage, mockHandler);
    } catch (e: unknown) {
      expect(e).toEqual(new Error('No recipient for post messages.'));
    }
  });

  test('Should return payment methods', async () => {
    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation(
        (name: string, handlerWrapper: EventListenerOrEventListenerObject) => {
          (handlerWrapper as (message: MessageEvent) => void)(mockMessageEvent);
        }
      );

    postMessagesClient.init(recipient, recipientUrl);
    const value = await postMessagesClient.send(mockMessage, mockHandler);
    expect(value).toEqual([mockPaymentMethod]);
  });
});
