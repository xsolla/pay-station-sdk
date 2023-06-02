import { container } from 'tsyringe';
import { HeadlessCheckout } from './headless-checkout';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';
import { LocalizeService } from '../../core/i18n/localize.service';

class MockIframeElement {
  public src = '';
  public width = '';
  public height = '';
  public style = { border: '' };

  public constructor() {
    setTimeout(() => this.onload());
  }

  public onload(): void {
    return;
  }
}

class CustomElementMock extends HTMLElement {
}

describe('HeadlessCheckout', () => {
  let windowService: Window;
  let headlessCheckout: HeadlessCheckout;
  let postMessagesClient: PostMessagesClient;
  let localizeService: LocalizeService;

  beforeEach(() => {
    windowService = window;
    postMessagesClient = {
      init: jest.fn(),
      send: jest.fn()
    } as unknown as PostMessagesClient;

    localizeService = {
      initDictionaries: async () => Promise.resolve()
    } as unknown as LocalizeService;

    headlessCheckout = container
      .createChildContainer()
      .register<Window>(Window, { useValue: windowService })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient
      })
      .register<LocalizeService>(LocalizeService, {
        useValue: localizeService
      })
      .resolve(HeadlessCheckout);
  });

  afterEach(() => {
    jest.resetAllMocks();
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

  test('Should correctly define web components', async () => {
    jest.spyOn(windowService.document.body, 'appendChild').mockImplementation();
    jest
      .spyOn(windowService.document, 'createElement')
      .mockImplementationOnce(
        () => new MockIframeElement() as unknown as HTMLIFrameElement
      );

    const spy = jest.spyOn(window.customElements, 'define');

    await headlessCheckout.init({ isWebview: false });
    expect(spy).toHaveBeenCalled();
  });

  test('Should web components not be redefined', async () => {
    jest.spyOn(windowService.customElements, 'get').mockReturnValue(CustomElementMock);
    jest.spyOn(windowService.document.body, 'appendChild').mockImplementation();
    jest
      .spyOn(windowService.document, 'createElement')
      .mockImplementationOnce(
        () => new MockIframeElement() as unknown as HTMLIFrameElement
      );

    const spy = jest.spyOn(window.customElements, 'define');

    await headlessCheckout.init({ isWebview: false });
    expect(spy).not.toHaveBeenCalled();
  });
});
