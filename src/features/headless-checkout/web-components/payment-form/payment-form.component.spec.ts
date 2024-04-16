import { container } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';
import { HeadlessCheckout } from '../../headless-checkout';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { PaymentFormFieldsService } from './payment-form-fields.service';
import { PaymentFormComponent } from './payment-form.component';
import { Field } from '../../../../core/form/field.interface';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { FieldSettings } from './field-settings.interface';
import { FormLoader } from '../../../../core/form/form-loader';

function createComponent(): void {
  const element = document.createElement(
    WebComponentTagName.PaymentFormComponent,
  );
  element.setAttribute('id', 'test');
  (document.getElementById('container')! as HTMLElement).appendChild(element);
}

const mockFormFields: Field[] = [
  {
    name: 'zip',
    type: 'text',
  },
  {
    name: 'card',
    type: 'text',
  },
] as unknown as Field[];

const getTextInputElements = (names: string[]): NodeListOf<Element> => {
  const mockContainer = document.createElement('div');
  for (const name of names) {
    const mockElement = document.createElement(
      WebComponentTagName.TextComponent,
    );
    mockElement.setAttribute('name', name);
    mockContainer.appendChild(mockElement);
  }

  return mockContainer.querySelectorAll(WebComponentTagName.TextComponent);
};

describe('PaymentFormComponent', () => {
  let headlessCheckout: HeadlessCheckout;
  let formSpy: FormSpy;
  let paymentFormFieldsManager: PaymentFormFieldsService;
  let postMessagesClient: PostMessagesClient;
  let windowService: Window;
  let formLoader: FormLoader;

  window.customElements.define(
    WebComponentTagName.PaymentFormComponent,
    PaymentFormComponent,
  );

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';

    headlessCheckout = {
      events: {
        send: noopStub,
        onCoreEvent: noopStub,
      },
      form: {
        onFieldsStatusChange: noopStub,
        onNextAction: noopStub,
      },
    } as unknown as HeadlessCheckout;

    formSpy = {
      listenFormInit: noopStub,
      get formWasInit() {
        return;
      },
      get formFields() {
        return;
      },
    } as unknown as FormSpy;

    formLoader = {
      setupAndAwaitFieldsLoading: noopStub,
      setFieldLoaded: noopStub,
    } as unknown as FormLoader;

    paymentFormFieldsManager = {
      createMissedFields: noopStub,
      removeExtraFields: noopStub,
      removeEmptyNameFields: noopStub,
    } as unknown as PaymentFormFieldsService;

    postMessagesClient = {
      send: noopStub,
    } as unknown as PostMessagesClient;

    windowService = window;

    container.clearInstances();

    container
      .register<FormSpy>(FormSpy, {
        useValue: formSpy,
      })
      .register<HeadlessCheckout>(HeadlessCheckout, {
        useValue: headlessCheckout,
      })
      .register<PaymentFormFieldsService>(PaymentFormFieldsService, {
        useValue: paymentFormFieldsManager,
      })
      .register<PostMessagesClient>(PostMessagesClient, {
        useValue: postMessagesClient,
      })
      .register<Window>(Window, { useValue: windowService })
      .register<FormLoader>(FormLoader, { useValue: formLoader });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Should create component', () => {
    createComponent();
    expect(
      document.querySelector(WebComponentTagName.PaymentFormComponent),
    ).toBeDefined();
  });

  it('Should load form fields', () => {
    const spy = spyOnProperty(formSpy, 'formFields', 'get').and.returnValue([]);
    spyOnProperty(formSpy, 'formWasInit', 'get').and.returnValue(true);
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should load form fields after init', () => {
    const spy = spyOnProperty(formSpy, 'formFields', 'get').and.returnValue([]);
    const formWasInitSpy = spyOnProperty(formSpy, 'formWasInit', 'get');
    const listenFormInitSpy = spyOn(formSpy, 'listenFormInit');
    listenFormInitSpy.and.callFake((callback: () => void) => {
      formWasInitSpy.and.returnValue(true);
      callback();
    });
    formWasInitSpy.and.returnValue(false);
    createComponent();
    expect(spy).toHaveBeenCalled();
  });

  it('Should create missed form fields', () => {
    spyOnProperty(formSpy, 'formFields', 'get').and.returnValue(mockFormFields);
    spyOnProperty(formSpy, 'formWasInit', 'get').and.returnValue(true);

    const textInputElements = getTextInputElements(['zip']);
    spyOn(windowService.document, 'querySelectorAll').and.returnValue(
      textInputElements,
    );

    const spy = spyOn(paymentFormFieldsManager, 'createMissedFields');
    createComponent();

    expect(spy).toHaveBeenCalled();
  });

  it('Should not call createMissedFields if no fields', () => {
    spyOnProperty(formSpy, 'formFields', 'get').and.returnValue(undefined);
    spyOnProperty(formSpy, 'formWasInit', 'get').and.returnValue(true);

    const spy = spyOn(paymentFormFieldsManager, 'createMissedFields');
    createComponent();

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should remove extra form fields', () => {
    spyOnProperty(formSpy, 'formFields', 'get').and.returnValue(mockFormFields);
    spyOnProperty(formSpy, 'formWasInit', 'get').and.returnValue(true);

    const textInputElements = getTextInputElements(['zip', 'zip']);
    spyOn(windowService.document, 'querySelectorAll').and.returnValue(
      textInputElements,
    );

    const spy = spyOn(paymentFormFieldsManager, 'removeExtraFields');
    createComponent();

    const zip: FieldSettings = {
      name: 'zip',
      type: 'text',
    };
    // rewrite querySelectorAll mock
    expect(spy).toHaveBeenCalledWith([
      zip,
      zip,
      zip,
      zip,
      zip,
      zip,
      zip,
      zip,
      zip,
    ]);
  });
});
