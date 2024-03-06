import 'reflect-metadata';
import { container } from 'tsyringe';
import { PaymentFormFieldsService } from './payment-form-fields.service';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { noopStub } from '../../../../tests/stubs/noop.stub';

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

describe('PaymentFormFieldsManager', () => {
  let paymentFormFieldsManager: PaymentFormFieldsService;
  let windowService: Window;

  beforeEach(() => {
    windowService = window;
    container.clearInstances();

    container.register<Window>(Window, { useValue: windowService });
    paymentFormFieldsManager = container
      .createChildContainer()
      .resolve(PaymentFormFieldsService);
  });

  it('Should create missed fields and append them into body', () => {
    const textInputElements = getTextInputElements([]);
    spyOn(windowService.document, 'querySelectorAll').and.returnValue(
      textInputElements,
    );
    const missedFields = [{ name: 'card', type: 'text' }];
    const mockBody = {
      appendChild: noopStub,
    } as unknown as HTMLElement;
    spyOn(windowService.document, 'querySelector').and.returnValue(
      mockBody as unknown as Element,
    );
    const spy = spyOn(mockBody, 'appendChild');
    paymentFormFieldsManager.createMissedFields(missedFields, mockBody);
    expect(spy).toHaveBeenCalled();
  });

  it('Should remove extra field', () => {
    const extraFields = [{ name: 'card', type: 'text' }];
    const mockElement = {
      remove: noopStub,
    };
    spyOn(windowService.document, 'querySelector').and.returnValue(
      mockElement as unknown as Element,
    );
    const spy = spyOn(mockElement, 'remove');
    paymentFormFieldsManager.removeExtraFields(extraFields);
    expect(spy).toHaveBeenCalled();
  });

  it('Should remove fields with empty name', () => {
    const textInputElements = getTextInputElements(['zip']);
    textInputElements.forEach((element) => {
      element.removeAttribute('name');
    });
    spyOn(windowService.document, 'querySelectorAll').and.returnValue(
      textInputElements,
    );
    const spy = spyOn(textInputElements[0], 'remove');
    paymentFormFieldsManager.removeEmptyNameFields();
    expect(spy).toHaveBeenCalled();
  });
});
