import { container } from 'tsyringe';
import { SubmitButtonComponent } from './submit-button.component';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { noopStub } from '../../../../tests/stubs/noop.stub';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.SubmitButtonComponent,
  );
  element.setAttribute('text', 'Pay Now');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('SubmitButtonComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;

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
    } as unknown as HeadlessCheckout;

    container.clearInstances();

    container
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
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
