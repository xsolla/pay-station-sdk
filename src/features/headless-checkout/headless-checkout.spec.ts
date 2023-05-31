import 'reflect-metadata';
import { container } from 'tsyringe';
import { HeadlessCheckout } from './headless-checkout';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';
import { LocalizeService } from '../../core/i18n/localize.service';

describe('HeadlessCheckout', () => {
  let headlessCheckout: HeadlessCheckout;
  let postMessagesClient: PostMessagesClient;
  let localizeService: LocalizeService;

  beforeEach(() => {
    postMessagesClient = {
      init: jest.fn(),
      send: jest.fn(),
    } as unknown as PostMessagesClient;

    localizeService = {
      initDictionaries: async () => Promise.resolve(),
    } as unknown as LocalizeService;

    headlessCheckout = container
      .createChildContainer()
      .register<Window>(Window, { useValue: window })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<LocalizeService>(LocalizeService, {
        useValue: localizeService,
      })
      .resolve(HeadlessCheckout);
  });

  test('Should init', () => {
    const localizeSpy = jest
      .spyOn(localizeService, 'initDictionaries')
      .mockResolvedValue();

    void headlessCheckout.init({ isWebview: false });

    expect(localizeSpy).toHaveBeenCalled();
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
