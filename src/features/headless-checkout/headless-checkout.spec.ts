import { container } from 'tsyringe';
import { HeadlessCheckout } from './headless-checkout';
import { PostMessagesClient } from '../../core/post-messages-client/post-messages-client';
import { EventName } from '../../core/event-name.enum';
import { Message } from '../../core/message.interface';
import { Handler } from '../../core/post-messages-client/handler.type';
import { LocalizeService } from '../../core/i18n/localize.service';
import { getFinanceDetailsHandler } from './post-messages-handlers/get-finance-details.handler';

const mockMessage: Message = {
  name: EventName.initPayment,
  data: {},
};

const mockHandler: Handler<void> = (): null => {
  return null;
};

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

class CustomElementMock extends HTMLElement {}

describe('HeadlessCheckout', () => {
  let windowService: Window;
  let headlessCheckout: HeadlessCheckout;
  let postMessagesClient: PostMessagesClient;
  let localizeService: LocalizeService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const stub = (): void => {};

  beforeEach(() => {
    windowService = window;
    postMessagesClient = {
      init: stub,
      send: stub,
      listen: stub,
    } as unknown as PostMessagesClient;

    localizeService = {
      initDictionaries: async () => Promise.resolve(),
    } as unknown as LocalizeService;

    headlessCheckout = container
      .createChildContainer()
      .register<Window>(Window, { useValue: windowService })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<LocalizeService>(LocalizeService, {
        useValue: localizeService,
      })
      .registerSingleton(HeadlessCheckout)
      .resolve(HeadlessCheckout);
  });

  it('Should init', async () => {
    const spy = spyOn(postMessagesClient, 'init');
    spyOn(windowService.document.body, 'appendChild');
    spyOn(windowService.document, 'createElement').and.callFake(
      () => new MockIframeElement() as unknown as HTMLIFrameElement
    );

    await headlessCheckout.init({ isWebview: false });
    expect(spy).toHaveBeenCalled();
  });

  it('Should init localization', () => {
    const localizeSpy = spyOn(
      localizeService,
      'initDictionaries'
    ).and.resolveTo();

    void headlessCheckout.init({ isWebview: false });

    expect(localizeSpy).toHaveBeenCalled();
  });

  it('Should send post message', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.events.send(mockMessage, mockHandler);
    expect(spy).toHaveBeenCalled();
  });

  it('Should set event handler', () => {
    const spy = spyOn(postMessagesClient, 'listen');
    headlessCheckout.events.onCoreEvent(
      EventName.initPayment,
      mockHandler,
      stub
    );
    expect(spy).toHaveBeenCalled();
  });

  it('Should start listen errors on init', async () => {
    const spy = spyOn(postMessagesClient, 'listen');
    spyOn(windowService.document.body, 'appendChild');
    spyOn(windowService.document, 'createElement').and.callFake(
      () => new MockIframeElement() as unknown as HTMLIFrameElement
    );

    await headlessCheckout.init({ isWebview: false });
    expect(spy).toHaveBeenCalled();
  });

  it('Should setToken', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.setToken('token');
    expect(spy).toHaveBeenCalled();
  });

  it('Should throw exception if empty token', async () => {
    try {
      await headlessCheckout.setToken('');
    } catch (e: unknown) {
      expect(e).toEqual(new Error('Need correct token'));
    }
  });

  it('Should getFinanceDetails', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.getFinanceDetails();
    expect(spy).toHaveBeenCalledWith(
      { name: EventName.financeDetails },
      getFinanceDetailsHandler
    );
  });

  it('Should getRegularMethods', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.getRegularMethods();
    expect(spy).toHaveBeenCalled();
  });

  it('Should getQuickMethods', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.getQuickMethods();
    expect(spy).toHaveBeenCalled();
  });

  it('Should correctly define web components', async () => {
    const spy = spyOn(windowService.customElements, 'define');
    spyOn(windowService.customElements, 'get').and.returnValue(undefined);
    spyOn(windowService.document.body, 'appendChild');
    spyOn(windowService.document, 'createElement').and.callFake(
      () => new MockIframeElement() as unknown as HTMLIFrameElement
    );

    await headlessCheckout.init({ isWebview: false });
    expect(spy).toHaveBeenCalled();
  });

  it('Should web components not be redefined', async () => {
    spyOn(windowService.customElements, 'get').and.returnValue(
      CustomElementMock
    );
    spyOn(windowService.document.body, 'appendChild');
    spyOn(windowService.document, 'createElement').and.callFake(
      () => new MockIframeElement() as unknown as HTMLIFrameElement
    );

    const spy = spyOn(window.customElements, 'define');

    await headlessCheckout.init({ isWebview: false });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should getSavedMethods', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.getSavedMethods();
    expect(spy).toHaveBeenCalled();
  });

  it('Should getUserBalance', async () => {
    const spy = spyOn(postMessagesClient, 'send');
    await headlessCheckout.getUserBalance();
    expect(spy).toHaveBeenCalled();
  });
});
