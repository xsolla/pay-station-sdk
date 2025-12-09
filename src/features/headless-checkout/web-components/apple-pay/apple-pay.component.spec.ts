import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { HeadlessCheckout } from '../../headless-checkout';
import { ApplePayComponent } from './apple-pay.component';
import { EventName } from '../../../../core/event-name.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';

function createComponent(): HTMLElement {
  const element = document.createElement(WebComponentTagName.ApplePayComponent);
  (document.getElementById('container')! as HTMLElement).appendChild(element);
  return element;
}

describe('ApplePayComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let postMessagesClient: PostMessagesClient;
  let formSpy: FormSpy;

  window.customElements.define(
    WebComponentTagName.ApplePayComponent,
    ApplePayComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      form: {
        onFieldsStatusChange: noopStub,
      },
      events: {
        onCoreEvent: () => noopStub,
      },
    } as unknown as HeadlessCheckout;

    formSpy = {
      listenFormInit: noopStub,
      get formWasInit() {
        return;
      },
    } as unknown as FormSpy;

    postMessagesClient = {
      send: noopStub,
    } as unknown as PostMessagesClient;

    container.clearInstances();

    container
      .register<FormSpy>(FormSpy, {
        useValue: formSpy,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<Window>(Window, {
        useValue: window,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Web component should be rendered', () => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);

    createComponent();

    expect(document.querySelector('iframe')).toBeDefined();
  });

  it('Should draw error', (done) => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    // eslint-disable-next-line prefer-const
    let element: HTMLElement;
    spyOn(headlessCheckout.events, 'onCoreEvent').and.callFake((...args) => {
      const eventName = args[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const callback: (value?: unknown) => void = args[2];
      setTimeout(() => {
        if (eventName === EventName.applePayError) {
          callback({ error: 'paymentError' });
          expect(element.querySelector('.apple-pay-error')).not.toBeNull();
          done();
        }
      });
      return () => {};
    });

    element = createComponent();
    expect(document.querySelector('iframe')).toBeDefined();
  });
});
