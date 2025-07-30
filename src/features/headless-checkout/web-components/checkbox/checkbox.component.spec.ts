import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckout } from '../../headless-checkout';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxComponentConfig } from './checkbox-component-config.interface';
import { XpsBoolean } from '../../../../core/xps-boolean.enum';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { FormLoader } from '../../../../core/form/form-loader';
import { ValidationErrorService } from '../../../../core/form/validation-error/validation-error.service';

const config: CheckboxComponentConfig = {
  name: 'test',
  title: 'title',
  error: 'error',
  initValue: XpsBoolean.false,
  placeholder: 'test placeholder',
};

function createComponent(): HTMLElement {
  const element = document.createElement(WebComponentTagName.CheckboxComponent);
  element.setAttribute('name', config.name);

  (document.getElementById('container')! as HTMLElement).appendChild(element);

  return element;
}

describe('CheckboxComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let validationErrorService: ValidationErrorService;
  let postMessagesClient: PostMessagesClient;
  let windowService: Window;
  let formLoader: FormLoader;

  window.customElements.define(
    WebComponentTagName.CheckboxComponent,
    CheckboxComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      form: { onFieldsStatusChange: noopStub },
    } as unknown as HeadlessCheckout;

    validationErrorService = {
      getMessage() {
        return null;
      },
    } as unknown as ValidationErrorService;

    postMessagesClient = {
      send: noopStub,
    } as unknown as PostMessagesClient;

    windowService = window;

    formLoader = {
      setupAndAwaitFieldsLoading: noopStub,
      setFieldLoaded: noopStub,
    } as unknown as FormLoader;

    container.clearInstances();

    container
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register(ValidationErrorService, {
        useValue: validationErrorService,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<FormSpy>(FormSpy, {
        useValue: {
          get formWasInit() {
            return true;
          },
        } as FormSpy,
      })
      .register<Window>(Window, { useValue: windowService })
      .register<FormLoader>(FormLoader, { useValue: formLoader });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    spyOn(postMessagesClient, 'send').and.resolveTo(config);

    createComponent();
    expect(
      document.querySelector(WebComponentTagName.CheckboxComponent),
    ).toBeDefined();
  });

  it('Should load checkbox component config', (done) => {
    const spy = spyOn(postMessagesClient, 'send').and.resolveTo(config);

    createComponent();

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('Should change checkbox value', (done) => {
    spyOn(postMessagesClient, 'send').and.resolveTo(config);

    const element = createComponent();

    const spy = spyOn(
      element as unknown as { notifyOnValueChanges(): void },
      'notifyOnValueChanges',
    );

    setTimeout(() => {
      const checkbox = element.querySelector('input');
      checkbox!.checked = true;
      checkbox!.dispatchEvent(new Event('change'));

      expect(spy).toHaveBeenCalled();
      done();
    }, 0);
  });
});
