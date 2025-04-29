import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckout } from '../../headless-checkout';
import { LegalComponent } from './legal.component';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { LegalComponentConfig } from './legal-component.config.interface';
import { tick } from '../../../../tests/stubs/tick';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.LegalComponent);
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const mockConfig: LegalComponentConfig = {
  isJapanUser: false,
  refundPolicyUrl: 'refundPolicyUrl',
};

describe('LegalComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;
  let postMessagesClient: PostMessagesClient;
  let windowService: Window;

  window.customElements.define(
    WebComponentTagName.LegalComponent,
    LegalComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      getRegularMethods: noopStub,
    } as unknown as HeadlessCheckout;

    headlessCheckoutSpy = {
      listenAppInit: noopStub,
      get appWasInit() {
        return;
      },
    } as unknown as HeadlessCheckoutSpy;

    postMessagesClient = {
      send: noopStub,
      listen: noopStub,
    } as unknown as PostMessagesClient;

    windowService = window;

    container.clearInstances();

    container
      .register<HeadlessCheckoutSpy>(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<Window>(Window, { useValue: windowService });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.LegalComponent),
    ).toBeDefined();
  });

  it('Should load legal component config', () => {
    const spy = spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve({}),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should load legal component config after init', () => {
    const spy = spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve({}),
    );
    const appWasInitSpy = spyOnProperty(
      headlessCheckoutSpy,
      'appWasInit',
      'get',
    );
    const listenAppInitSpy = spyOn(headlessCheckoutSpy, 'listenAppInit');
    listenAppInitSpy.and.callFake((callback: () => void) => {
      appWasInitSpy.and.returnValue(true);
      callback();
    });
    appWasInitSpy.and.returnValue(false);
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should call addEventListener', async () => {
    spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve(mockConfig),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    const spy = spyOn(postMessagesClient, 'listen');
    createComponent();
    await tick();
    expect(spy).toHaveBeenCalled();
  });

  it('Should not call addEventListener', async () => {
    spyOn(postMessagesClient, 'send').and.returnValue(Promise.resolve(null));
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    const spy = spyOn(windowService, 'addEventListener');
    createComponent();
    await tick();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should send pong message', async () => {
    spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve(mockConfig),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    spyOn(windowService, 'addEventListener').and.callFake(
      (name: string, callback: (event: unknown) => void) => {
        const messageEvent = {
          data: JSON.stringify({
            name: EventName.requiredComponentPing,
            data: { componentName: 'LegalComponent' },
          }),
          origin: '',
          source: {
            postMessage: noopStub,
          },
        };
        const spy = spyOn(messageEvent.source, 'postMessage');
        callback(messageEvent);
        expect(spy).toHaveBeenCalled();
      },
    );
    createComponent();
    await tick();
  });
});
