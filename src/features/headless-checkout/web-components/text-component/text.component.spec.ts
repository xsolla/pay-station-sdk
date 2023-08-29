import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { HeadlessCheckout } from '../../headless-checkout';
import { TextComponent } from './text.component';

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.TextComponent);
  element.setAttribute('name', 'zip');
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('TextComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;
  let formSpy: FormSpy;
  let windowMock: Window;

  window.customElements.define(
    WebComponentTagName.TextComponent,
    TextComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      send: noopStub,
    } as unknown as PostMessagesClient;

    headlessCheckout = {
      form: {
        onNextAction: noopStub,
      },
    } as unknown as HeadlessCheckout;

    formSpy = {
      listenFormInit: noopStub,
      get formWasInit() {
        return;
      },
    } as unknown as FormSpy;

    windowMock = {
      addEventListener: noopStub,
      document: {
        createElement: noopStub,
      },
    } as unknown as Window;

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
      })
      .register<Window>(Window, {
        useValue: windowMock,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Web component should be rendered', () => {
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    const postMessageSpy = spyOn(postMessagesClient, 'send').and.stub();

    createComponent();

    expect(document.querySelector('iframe')).toBeDefined();
    expect(document.getElementsByClassName('label')).toBeDefined();
    expect(postMessageSpy).toHaveBeenCalled();
  });
});
