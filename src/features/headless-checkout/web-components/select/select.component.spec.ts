import { container } from 'tsyringe';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { SelectAttributes } from './select-attributes.enum';
import { SelectComponent } from './select.component';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { FormLoader } from '../../../../core/form/form-loader';
import { ValidationErrorService } from '../../../../core/form/validation-error/validation-error.service';

function createComponent(name: string): HTMLElement {
  const element = document.createElement(WebComponentTagName.SelectComponent);

  element.setAttribute(SelectAttributes.name, name);
  element.setAttribute('id', 'test');

  (document.getElementById('container')! as HTMLElement).appendChild(element);

  return element;
}

const configMock = {
  name: 'state',
  options: [
    {
      value: 'first',
      label: 'first-label',
    },
    {
      value: 'second',
      label: 'second-label',
    },
  ],
};

describe('SelectComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;
  let headlessCheckoutSpy: HeadlessCheckoutSpy;
  let validationErrorService: ValidationErrorService;
  let formLoader: FormLoader;

  window.customElements.define(
    WebComponentTagName.SelectComponent,
    SelectComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    postMessagesClient = {
      send: noopStub,
    } as unknown as PostMessagesClient;

    formLoader = {
      setupAndAwaitFieldsLoading: noopStub,
      setFieldLoaded: noopStub,
    } as unknown as FormLoader;

    headlessCheckout = {
      form: {
        onFieldsStatusChange: noopStub,
      },
    } as unknown as HeadlessCheckout;

    headlessCheckoutSpy = {
      listenAppInit: noopStub,
      get appWasInit() {
        return true;
      },
    } as unknown as HeadlessCheckoutSpy;

    validationErrorService = {
      getMessage() {
        return null;
      },
    } as unknown as ValidationErrorService;

    container.clearInstances();

    container
      .register(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register(ValidationErrorService, {
        useValue: validationErrorService,
      })
      .register<FormSpy>(FormSpy, {
        useValue: {
          get formWasInit() {
            return true;
          },
        } as FormSpy,
      })
      .register(Window, {
        useValue: window,
      })
      .register(HeadlessCheckoutSpy, {
        useValue: headlessCheckoutSpy,
      })
      .register(FormLoader, {
        useValue: formLoader,
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    const appWasInitSpy = spyOnProperty(
      headlessCheckoutSpy,
      'appWasInit',
      'get',
    );
    const listenAppInitSpy = spyOn(headlessCheckoutSpy, 'listenAppInit');
    listenAppInitSpy.and.callFake((callback: () => void) => {
      appWasInitSpy.and.returnValue(true);
      callback();
    });
  });

  it('Should create component', () => {
    spyOn(postMessagesClient, 'send').and.resolveTo(configMock);

    createComponent('state');

    expect(
      document.querySelector(WebComponentTagName.SelectComponent),
    ).toBeDefined();
  });

  it('should render select with default option', (doneFn) => {
    const postMessageSpy = spyOn(postMessagesClient, 'send').and.resolveTo(
      configMock,
    );

    const selectComponent = createComponent('state');

    setTimeout(() => {
      const selectContentElement =
        selectComponent.querySelector('#select-content');

      expect(postMessageSpy).toHaveBeenCalled();
      expect(selectContentElement?.textContent?.replace(/\s/g, '')).toEqual(
        configMock.options[0].label,
      );

      doneFn();
    }, 0);
  });

  it('should render all options in dropdown', (doneFn) => {
    const postMessageSpy = spyOn(postMessagesClient, 'send').and.resolveTo(
      configMock,
    );

    const selectComponent = createComponent('state');

    setTimeout(() => {
      const selectOptionsElement =
        selectComponent.querySelector('#select-options');

      expect(postMessageSpy).toHaveBeenCalled();
      expect(selectOptionsElement?.children.length).toEqual(
        configMock.options.length,
      );

      doneFn();
    }, 0);
  });
});
