import { container } from 'tsyringe';
import { SubmitButtonComponent } from './submit-button.component';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.SubmitButtonComponent
  );
  element.setAttribute('text', 'Pay Now');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('SubmitButtonComponent', () => {
  let postMessagesClient: PostMessagesClient;
  window.customElements.define(
    WebComponentTagName.SubmitButtonComponent,
    SubmitButtonComponent
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const stub = (): void => {};

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      init: stub,
      send: stub,
    } as unknown as PostMessagesClient;
    spyOn(container, 'resolve').and.returnValue(postMessagesClient);
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

    document.querySelector('button')!.click();

    expect(spy).toHaveBeenCalled();
  });
});
