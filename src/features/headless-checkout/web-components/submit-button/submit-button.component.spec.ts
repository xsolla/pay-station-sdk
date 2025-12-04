import { container } from 'tsyringe';
import { SubmitButtonComponent } from './submit-button.component';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { applePayId } from '../apple-pay/apple-pay-id.const';
import { FormConfiguration } from '../../../../core/form/form-configuration.interface';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.SubmitButtonComponent,
  );
  element.setAttribute('text', 'Pay Now');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('SubmitButtonComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let formSpy: FormSpy;
  let postMessagesClient: PostMessagesClient;

  window.customElements.define(
    WebComponentTagName.SubmitButtonComponent,
    SubmitButtonComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      init: noopStub,
      send: noopStub,
    } as unknown as PostMessagesClient;

    headlessCheckout = {
      form: {
        onNextAction: noopStub,
        onFieldsStatusChange: noopStub,
      },
      get formConfiguration() {
        return null;
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

    container.clearInstances();

    container
      .register<FormSpy>(FormSpy, {
        useValue: formSpy,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<Window>(Window, {
        useValue: window,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
  });

  it('Should draw default button', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.SubmitButtonComponent)!
        .innerHTML,
    ).toContain(WebComponentTagName.DefaultSubmitButtonComponent);
  });

  it('Should draw apple pay button', () => {
    spyOnProperty(headlessCheckout, 'formConfiguration', 'get').and.returnValue(
      { paymentMethodId: applePayId } as FormConfiguration,
    );
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.SubmitButtonComponent)!
        .innerHTML,
    ).toContain(WebComponentTagName.ApplePayComponent);
  });
});
