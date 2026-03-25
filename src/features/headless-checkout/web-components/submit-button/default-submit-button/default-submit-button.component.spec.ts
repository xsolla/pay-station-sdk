import { container } from 'tsyringe';
import { DefaultSubmitButtonComponent } from './default-submit-button.component';
import { PostMessagesClient } from '../../../../../core/post-messages-client/post-messages-client';
import { WebComponentTagName } from '../../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckout } from '../../../headless-checkout';
import { noopStub } from '../../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../../core/spy/form-spy/form-spy';
import { LocalizeService } from '../../../../../core/i18n/localize.service';

function createComponent(text?: string): void {
  const element = document.createElement(
    WebComponentTagName.DefaultSubmitButtonComponent,
  );
  if (text) {
    element.setAttribute('text', text);
  }
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

describe('DefaultSubmitButtonComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;
  let formSpy: FormSpy;
  let localizeService: LocalizeService;

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
        onNextAction: () => noopStub,
        onFieldsStatusChange: () => noopStub,
      },
    } as unknown as HeadlessCheckout;

    formSpy = {
      listenFormInit: noopStub,
      get formWasInit() {
        return;
      },
    } as unknown as FormSpy;

    localizeService = {
      translate: (key: string) =>
        key === 'submit-button.default-text' ? 'Pay now' : key,
    } as unknown as LocalizeService;

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
      .register<LocalizeService>(LocalizeService, {
        useValue: localizeService,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
  });

  it('Should set text for button', () => {
    createComponent('Pay Now');

    expect(document.querySelector('button')!.textContent).toContain('Pay Now');
  });

  it('Should show localized default text when no text attribute', () => {
    createComponent();

    expect(document.querySelector('button')!.textContent).toContain('Pay now');
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
