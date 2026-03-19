import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { RedirectComponent } from './redirect.component';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import createSpy = jasmine.createSpy;

interface RedirectData {
  redirectUrl: string;
  data: { [key: string]: string };
  method?: string;
  isNewWindowRequired?: boolean;
  isSameWindowRequired?: boolean;
}

function createComponent(): void {
  const element = document.createElement(WebComponentTagName.RedirectComponent);

  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

function getRedirectComponent(): RedirectComponent {
  return document.querySelector(
    WebComponentTagName.RedirectComponent,
  ) as unknown as RedirectComponent;
}

describe('RedirectComponent', () => {
  let windowService: Window;

  window.customElements.define(
    WebComponentTagName.RedirectComponent,
    RedirectComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    windowService = {
      document: {
        createElement: noopStub,
      },
      open: noopStub,
    } as unknown as Window;

    container.clearInstances();

    container.register<Window>(Window, {
      useValue: windowService,
    });

    container.register<PostMessagesClient>(PostMessagesClient, {
      useValue: jasmine.createSpyObj('PostMessagesClient', [
        'sendPublicMessage',
      ]),
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.RedirectComponent),
    ).toBeDefined();
  });

  it('should submit form in same window when isSameWindowRequired is true', () => {
    const submitSpy = createSpy('submitSpy');

    const formElement = window.document.createElement('form');
    formElement.submit = submitSpy;
    const inputElement = window.document.createElement('input');

    const redirectData: RedirectData = {
      redirectUrl: 'https://example.com/pay',
      method: 'POST',
      data: { foo: 'bar' },
      isNewWindowRequired: false,
      isSameWindowRequired: true,
    };

    spyOn(windowService.document, 'createElement').and.callFake(
      (tagName: string) => (tagName === 'form' ? formElement : inputElement),
    );

    createComponent();
    getRedirectComponent().setAttribute(
      'data-redirect',
      JSON.stringify(redirectData),
    );

    expect(submitSpy).toHaveBeenCalled();
  });

  it('should open new window and submit form on button click when isNewWindowRequired is true', () => {
    const submitSpy = createSpy('submitSpy');

    const formElement = window.document.createElement('form');
    formElement.submit = submitSpy;
    const inputElement = window.document.createElement('input');

    const redirectData: RedirectData = {
      redirectUrl: 'https://example.com/pay',
      method: 'POST',
      data: { foo: 'bar' },
      isNewWindowRequired: true,
      isSameWindowRequired: false,
    };

    spyOn(windowService.document, 'createElement').and.callFake(
      (tagName: string) => (tagName === 'form' ? formElement : inputElement),
    );
    const windowOpenSpy = spyOn(windowService, 'open').and.returnValue(window);

    createComponent();
    const redirectComponent = getRedirectComponent();
    redirectComponent.setAttribute(
      'data-redirect',
      JSON.stringify(redirectData),
    );

    redirectComponent.querySelector('button')?.click();

    expect(windowOpenSpy).toHaveBeenCalledWith('about:blank', 'redirect-window');
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should set GET method on form when method is not POST', () => {
    const formElement = window.document.createElement('form');
    formElement.submit = createSpy('submitSpy');
    const inputElement = window.document.createElement('input');

    const redirectData: RedirectData = {
      redirectUrl: 'https://example.com/pay',
      data: {},
      isNewWindowRequired: false,
      isSameWindowRequired: true,
    };

    spyOn(windowService.document, 'createElement').and.callFake(
      (tagName: string) => (tagName === 'form' ? formElement : inputElement),
    );
    spyOn(windowService, 'open').and.stub();

    createComponent();
    getRedirectComponent().setAttribute(
      'data-redirect',
      JSON.stringify(redirectData),
    );

    expect(formElement.getAttribute('method')).toBe('GET');
  });
});
