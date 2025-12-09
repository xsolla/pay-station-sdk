import { container } from 'tsyringe';
import { DefaultSubmitButtonComponent } from './default-submit-button.component';
import { PostMessagesClient } from '../../../../../core/post-messages-client/post-messages-client';
import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckout } from '../../../headless-checkout';
import { noopStub } from '../../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../../core/spy/form-spy/form-spy';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.DefaultSubmitButtonComponent,
  );
  element.setAttribute('text', 'Pay Now');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('DefaultSubmitButtonComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;
  let formSpy: FormSpy;

  window.customElements.define(
    WebComponentTagName.DefaultSubmitButtonComponent,
    DefaultSubmitButtonComponent,
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
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
  });

  it('Should set text for button', () => {
    createComponent();

    expect(document.querySelector('button')!.textContent).toContain('Pay Now');
  });

  it('Should sendPostMessage event', () => {
    const spy = spyOn(postMessagesClient, 'send');

    createComponent();

    const button = document.querySelector('button');

    button!.removeAttribute('disabled');
    button!.click();

    expect(spy).toHaveBeenCalled();
  });
});
