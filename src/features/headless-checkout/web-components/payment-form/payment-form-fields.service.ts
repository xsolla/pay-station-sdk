import { injectable } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { getWebComponent } from './get-web-component-by-field-name.function';
import { FieldSettings } from './field-settings.interface';

@injectable()
export class PaymentFormFieldsService {
  public constructor(private readonly window: Window) {}

  public createMissedFields(
    missedFields: FieldSettings[],
    container: HTMLElement,
  ): void {
    const documentFragment = this.window.document.createDocumentFragment();

    for (const field of missedFields) {
      const formElement = this.window.document.createElement(
        getWebComponent(field),
      );
      formElement.setAttribute('name', field.name);
      documentFragment.append(formElement);
    }

    container.appendChild(documentFragment);
  }

  public removeExtraFields(extraFields: FieldSettings[]): void {
    for (const field of extraFields) {
      const formElement = this.window.document.querySelector(
        `[name=${field.name}]`,
      );
      formElement?.remove();
    }
  }

  public removeEmptyNameFields(): void {
    const formInputs = this.window.document.querySelectorAll(
      WebComponentTagName.TextComponent,
    );
    Array.from(formInputs).forEach((formInput) => {
      if (!formInput.getAttribute('name')) {
        formInput.remove();
      }
    });
  }
}
