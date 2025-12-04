import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { UserBalanceComponent } from './user-balance-component';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.UserBalanceComponent,
  );
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('UserBalanceComponent', () => {
  let headlessCheckoutSpy: HeadlessCheckoutSpy;
  let postMessagesClient: PostMessagesClient;

  window.customElements.define(
    WebComponentTagName.UserBalanceComponent,
    UserBalanceComponent,
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
    } as unknown as PostMessagesClient;

    container.clearInstances();

    container
      .register<HeadlessCheckoutSpy>(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.UserBalanceComponent),
    ).toBeDefined();
  });

  it('Should load user balance', () => {
    const spy = spyOn(postMessagesClient, 'send').and.returnValue(
      Promise.resolve({}),
    );
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should load user balance after init', () => {
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
});
