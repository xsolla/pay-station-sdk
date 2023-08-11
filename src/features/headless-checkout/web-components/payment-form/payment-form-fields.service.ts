import { injectable } from 'tsyringe';
import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';

@injectable()
export class PaymentFormFieldsService {
  public constructor(private readonly window: Window) {}

  public createMissedFields(
    missedFieldsNames: string[],
    container: HTMLElement
  ): void {
    const documentFragment = this.window.document.createDocumentFragment();

    for (const name of missedFieldsNames) {
      const formElement = this.window.document.createElement(
        WebComponentTagName.TextComponent
      );
      formElement.setAttribute('name', name);
      documentFragment.append(formElement);
    }

    container.appendChild(documentFragment);
  }

  public removeExtraFields(extraFieldsNames: Array<string | null>): void {
    for (const name of extraFieldsNames) {
      if (!name) {
        continue;
      }
      const formElement = this.window.document.querySelector(`[name=${name}]`);
      formElement?.remove();
    }
  }

  public removeEmptyNameFields(): void {
    const formInputs = this.window.document.querySelectorAll(
      WebComponentTagName.TextComponent
    );
    Array.from(formInputs).forEach((formInput) => {
      if (!formInput.getAttribute('name')) {
        formInput.remove();
      }
    });
  }
}
