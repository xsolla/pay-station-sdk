import 'reflect-metadata';
import { container } from 'tsyringe';
import { HeadlessCheckout } from './headless-checkout';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';

describe('HeadlessCheckout', () => {
  let headlessCheckout: HeadlessCheckout;
  let postMessagesClient: PostMessagesClient;

  beforeEach(() => {
    postMessagesClient = {
      init: jest.fn(),
      send: jest.fn(),
    } as unknown as PostMessagesClient;

    headlessCheckout = container
      .createChildContainer()
      .register<Window>(Window, { useValue: window })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .resolve(HeadlessCheckout);
  });

  test('Should setToken', async () => {
    const spy = jest.spyOn(postMessagesClient, 'send');
    await headlessCheckout.setToken('token');
    expect(spy).toHaveBeenCalled();
  });

  test('Should throw exception if empty token', async () => {
    try {
      await headlessCheckout.setToken('');
    } catch (e: unknown) {
      expect(e).toEqual(new Error('Need correct token'));
    }
  });

  test('Should getRegularMethods', async () => {
    const spy = jest.spyOn(postMessagesClient, 'send');
    await headlessCheckout.getRegularMethods();
    expect(spy).toHaveBeenCalled();
  });

  test('Should getQuickMethods', async () => {
    const spy = jest.spyOn(postMessagesClient, 'send');
    await headlessCheckout.getQuickMethods();
    expect(spy).toHaveBeenCalled();
  });
});
