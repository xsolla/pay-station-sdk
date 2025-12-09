import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { PaymentFormMessagesComponent } from './payment-form-messages.component';
import { HeadlessCheckoutMock } from '../../../../tests/stubs/headless-checkout.mock';
import { HeadlessCheckout } from '../../headless-checkout';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.PaymentFormMessages,
  );
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('PaymentFormMessagesComponent', () => {
  let headlessCheckout: HeadlessCheckoutMock<string[]>;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;

  window.customElements.define(
    WebComponentTagName.PaymentFormMessages,
    PaymentFormMessagesComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = new HeadlessCheckoutMock<string[]>();
    headlessCheckoutSpy = {
      listenAppInit: noopStub,
      get appWasInit() {
        return;
      },
    } as unknown as HeadlessCheckoutSpy;

    container.clearInstances();

    container
      .register<HeadlessCheckoutSpy>(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout as unknown as HeadlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.PaymentFormMessages),
    ).toBeDefined();
  });

  it('Should subscribe to form messages event', () => {
    const spy = spyOn(headlessCheckout.events, 'onCoreEvent');
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should not draw for empty form messages event', () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    headlessCheckout.emitEvent(null);
    const element = document.querySelector(
      WebComponentTagName.PaymentFormMessages,
    );
    expect(element!.innerHTML).toEqual('');
  });

  it('Should draw on finance details event', () => {
    spyOnProperty(headlessCheckoutSpy, 'appWasInit', 'get').and.returnValue(
      true,
    );
    createComponent();
    headlessCheckout.emitEvent(['message1']);
    expect(
      document.querySelector(WebComponentTagName.PaymentFormMessages),
    ).not.toBeNull();
  });
});
