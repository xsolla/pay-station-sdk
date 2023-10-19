import { BaseControl } from '../base-control/base-control.abstract';
import { CheckboxAttributes } from './checkbox-attributes.enum';
import { getCheckboxComponentTemplate } from './checkbox.template';
import { XpsBoolean } from '../../../../core/xps-boolean.enum';
import { CheckboxComponentConfig } from './checkbox-component-config.interface';
import { HeadlessCheckout } from '../../headless-checkout';
import { container } from 'tsyringe';
import { ValidationErrors } from '../../../../core/form/validation-errors.interface';

export class CheckboxComponent extends BaseControl {
  private config: CheckboxComponentConfig | null = null;
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly window: Window;
  private isListeningFieldStatusChange = false;
  public constructor() {
    super();
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.window = container.resolve(Window);
  }

  public get nameAttr(): string {
    return this.getAttribute(CheckboxAttributes.name) ?? '';
  }

  public static get observedAttributes(): string[] {
    return [CheckboxAttributes.name];
  }

  protected connectedCallback(): void {
    this.controlName = this.nameAttr;

    if (!this.controlName) {
      return;
    }

    this.listenFieldStatusChange(this.controlName);

    void this.getComponentConfig(this.controlName).then((config) => {
      this.config = config as CheckboxComponentConfig;

      this.render();
      this.addEventListenerToElement(this.inputRef, 'change', (event: Event) =>
        this.notifyOnValueChanges(event)
      );
    });
  }

  protected attributeChangedCallback(): void {
    if (!this.controlName) {
      return this.connectedCallback();
    }

    super.attributeChangedCallback();
  }

  protected getHtml(): string {
    console.info('checkbox config', this.config);

    if (!this.config) {
      return '';
    }

    return getCheckboxComponentTemplate(this.config);
  }

  private get inputRef(): HTMLElement {
    return this.querySelector('input') as HTMLElement;
  }

  protected notifyOnValueChanges(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const value = isChecked ? XpsBoolean.true : XpsBoolean.false;

    super.notifyOnValueChanges(value);
  }

  private listenFieldStatusChange(controlName: string): void {
    if (this.isListeningFieldStatusChange) {
      return;
    }

    this.isListeningFieldStatusChange = true;
    this.headlessCheckout.form.onFieldsStatusChange((fieldsStatus) => {
      const fieldStatus = fieldsStatus[controlName];

      if (!this.config || !fieldStatus) {
        return;
      }

      console.log(fieldsStatus);
      this.config.error = this.getFirstError(fieldStatus.errors);
      this.updateError(fieldStatus.isFocused);
    });
  }

  private updateError(isFieldInFocus: boolean | undefined): void {
    const rootElement = this.shadowRoot ?? this;
    const errorElement = rootElement.querySelector('.field-error');

    if (this.config?.error && !isFieldInFocus) {
      if (!errorElement) {
        const newErrorElement = this.window.document.createElement('div');
        newErrorElement.classList.add('field-error');
        newErrorElement.textContent = this.config.error;
        rootElement.appendChild(newErrorElement);
      } else {
        errorElement.textContent = this.config.error;
      }
    } else {
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  private getFirstError(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }

    const firstErrorKey: string = Object.keys(errors)[0];
    return errors[firstErrorKey]?.message ?? null;
  }
}
