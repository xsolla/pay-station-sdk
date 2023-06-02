import { container } from 'tsyringe';
import { SubmitButtonComponent } from './submit-button.component';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.SubmitButtonComponent);
  element.setAttribute('text', 'Pay Now');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('HeadlessCheckout', () => {
  let postMessagesClient: PostMessagesClient;
  window.customElements.define(WebComponentTagName.SubmitButtonComponent, SubmitButtonComponent);

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      init: jest.fn(),
      send: jest.fn()
    } as unknown as PostMessagesClient;
    jest.spyOn(container, 'resolve').mockReturnValue(postMessagesClient);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Should set text for button', () => {
    createComponent();

    expect(document.querySelector('button')!.textContent).toContain('Pay Now');
  });

  test('Should sendPostMessage event', () => {
    const spy = jest.spyOn(postMessagesClient, 'send');
    createComponent();

    document.querySelector('button')!.click();

    expect(spy).toHaveBeenCalled();
  });
});
