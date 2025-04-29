import { container } from 'tsyringe';
import { EventName } from '../../../../../core/event-name.enum';
import { PostMessagesClient } from '../../../../../core/post-messages-client/post-messages-client';
import { HeadlessCheckoutSpy } from '../../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../../tests/stubs/noop.stub';
import { tick } from '../../../../../tests/stubs/tick';
import { LegalComponentConfig } from '../legal-component.config.interface';
import { LegalMorComponent } from './legal-mor.component';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.LegalMorComponent);
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const mockConfig = {
  legalArea: 'US',
} as unknown as LegalComponentConfig;

describe('LegalMorComponent', () => {
  let headlessCheckoutSpy: HeadlessCheckoutSpy;
  let postMessagesClient: PostMessagesClient;
  let windowService: Window;

  window.customElements.define(
    WebComponentTagName.LegalMorComponent,
    LegalMorComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

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
      document.querySelector(WebComponentTagName.LegalMorComponent),
    ).toBeDefined();
  });

  it('Should load legal config', () => {
    const spy = spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve({}),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should load legal config after init', () => {
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
            data: { componentName: 'LegalMorComponent' },
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
