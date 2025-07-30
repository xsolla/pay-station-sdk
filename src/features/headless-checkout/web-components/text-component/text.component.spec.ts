import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { HeadlessCheckout } from '../../headless-checkout';
import { TextComponent } from './text.component';
import { FormFieldsStatus } from '../../../../core/form/form-fields-status.interface';
import { ValidationErrorService } from '../../../../core/form/validation-error/validation-error.service';

const fieldName = 'zip';

const emptyFieldsStatus: FormFieldsStatus = {};

const validFieldsStatus: FormFieldsStatus = {
  [fieldName]: {
    name: fieldName,
    validationStatus: 'VALID',
    errors: null,
  },
};

const invalidFieldsStatus: FormFieldsStatus = {
  [fieldName]: {
    name: fieldName,
    validationStatus: 'INVALID',
    isTouched: true,
    errors: {
      errorName: {
        message: 'message',
      },
    },
  },
};

const focusedInvalidFieldsStatus: FormFieldsStatus = {
  [fieldName]: {
    name: fieldName,
    validationStatus: 'INVALID',
    isFocused: true,
    errors: {
      errorName: {
        message: 'message',
      },
    },
  },
};

function createComponent(): HTMLElement {
  const element = document.createElement(WebComponentTagName.TextComponent);
  element.setAttribute('name', fieldName);
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
  return element;
}

describe('TextComponent', () => {
  let postMessagesClient: PostMessagesClient;
  let headlessCheckout: HeadlessCheckout;
  let validationErrorService: ValidationErrorService;
  let formSpy: FormSpy;

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
        onFieldsStatusChange: noopStub,
      },
      events: {
        onCoreEvent: noopStub,
      },
    } as unknown as HeadlessCheckout;

    validationErrorService = {
      getMessage() {
        return null;
      },
    } as unknown as ValidationErrorService;

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
      })
      .register(ValidationErrorService, {
        useValue: validationErrorService,
      })
      .register<Window>(Window, {
        useValue: window,
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

  it('Should not render error element for valid field state', (done) => {
    let element: HTMLElement = document.createElement('div');
    let callback: (fieldsStatus: FormFieldsStatus) => void = noopStub;
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.resolveTo({
      name: fieldName,
    });
    spyOn(headlessCheckout.form, 'onFieldsStatusChange').and.callFake(
      (callbackFn) => {
        setTimeout(() => (callback = callbackFn));
      },
    );

    element = createComponent();

    setTimeout(() => {
      callback(validFieldsStatus);
      expect(element.getElementsByClassName('field-error')[0]).toBeUndefined();
      done();
    });
  });

  it('Should not render error element if no current field state', (done) => {
    let element: HTMLElement = document.createElement('div');
    let callback: (fieldsStatus: FormFieldsStatus) => void = noopStub;
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.resolveTo({
      name: fieldName,
    });
    spyOn(headlessCheckout.form, 'onFieldsStatusChange').and.callFake(
      (callbackFn) => {
        setTimeout(() => (callback = callbackFn));
      },
    );

    element = createComponent();

    setTimeout(() => {
      callback(emptyFieldsStatus);
      expect(element.getElementsByClassName('field-error')[0]).toBeUndefined();
      done();
    });
  });

  it('Should render error element', (done) => {
    let element: HTMLElement = document.createElement('div');
    let callback: (fieldsStatus: FormFieldsStatus) => void = noopStub;
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.resolveTo({
      name: fieldName,
    });
    spyOn(headlessCheckout.form, 'onFieldsStatusChange').and.callFake(
      (callbackFn) => {
        setTimeout(() => (callback = callbackFn));
      },
    );
    spyOn(validationErrorService, 'getMessage').and.returnValue(
      'error message',
    );

    element = createComponent();

    setTimeout(() => {
      callback(invalidFieldsStatus);
      expect(element.getElementsByClassName('field-error')[0]).toBeDefined();
      done();
    });
  });

  it('Should remove error element', (done) => {
    let element: HTMLElement = document.createElement('div');
    let callback: (fieldsStatus: FormFieldsStatus) => void = noopStub;
    spyOnProperty(formSpy, 'formWasInit').and.returnValue(true);
    spyOn(postMessagesClient, 'send').and.resolveTo({
      name: fieldName,
    });
    spyOn(headlessCheckout.form, 'onFieldsStatusChange').and.callFake(
      (callbackFn) => {
        setTimeout(() => (callback = callbackFn));
      },
    );
    spyOn(validationErrorService, 'getMessage').and.returnValue(
      'error message',
    );

    element = createComponent();

    setTimeout(() => {
      callback(invalidFieldsStatus);
      expect(element.getElementsByClassName('field-error')[0]).toBeDefined();

      callback(focusedInvalidFieldsStatus);
      expect(element.getElementsByClassName('field-error')[0]).toBeUndefined();

      done();
    });
  });
});
