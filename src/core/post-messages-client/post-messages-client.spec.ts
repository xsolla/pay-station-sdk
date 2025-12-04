import { PostMessagesClient } from './post-messages-client';
import { Message } from '../message.interface';
import { EventName } from '../event-name.enum';
import { Handler } from './handler.type';
import { container } from 'tsyringe';
import { PaymentMethod } from '../payment-method.interface';
import { isMethodsEventMessage } from '../../core/guards/methods-event-message.guard';

const mockHandler: Handler<PaymentMethod[]> = (
  message: Message,
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
    container.clearInstances();
    postMessagesClient = container
      .createChildContainer()
      .register<Window>(Window, { useValue: window })
      .resolve(PostMessagesClient);
  });

  it('Should throw exception if no recipient', () => {
    const promise = postMessagesClient.send(mockMessage, mockHandler);
    return expectAsync(promise).toBeRejectedWithError(
      'No recipient for post messages.',
    );
  });

  it('Should return payment methods', async () => {
    spyOn(window, 'addEventListener').and.callFake(
      (name: string, handlerWrapper: EventListenerOrEventListenerObject) => {
        (handlerWrapper as (message: MessageEvent) => void)(mockMessageEvent);
      },
    );

    postMessagesClient.init(recipient, recipientUrl);
    const value = await postMessagesClient.send(mockMessage, mockHandler);
    expect(value).toEqual([mockPaymentMethod]);
  });

  it('Should call callback on event', () => {
    spyOn(window, 'addEventListener').and.callFake(
      (name: string, handlerWrapper: EventListenerOrEventListenerObject) => {
        (handlerWrapper as (message: MessageEvent) => void)(mockMessageEvent);
      },
    );

    const callbackSpy = jasmine.createSpy();
    postMessagesClient.init(recipient, recipientUrl);
    postMessagesClient.listen(
      EventName.getPaymentMethodsList,
      mockHandler,
      callbackSpy,
    );

    expect(callbackSpy).toHaveBeenCalled();
  });

  it('Should remove event listener', () => {
    const spy = spyOn(window, 'removeEventListener');

    const callbackSpy = jasmine.createSpy();
    postMessagesClient.init(recipient, recipientUrl);
    const removeListener = postMessagesClient.listen(
      EventName.getPaymentMethodsList,
      mockHandler,
      callbackSpy,
    );
    removeListener();

    expect(spy).toHaveBeenCalled();
  });
});
