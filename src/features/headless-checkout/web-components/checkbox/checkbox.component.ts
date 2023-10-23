import { BaseControl } from '../base-control/base-control.abstract';
import { CheckboxAttributes } from './checkbox-attributes.enum';
import { getCheckboxComponentTemplate } from './checkbox.template';
import { XpsBoolean } from '../../../../core/xps-boolean.enum';
import { CheckboxComponentConfig } from './checkbox-component-config.interface';

export class CheckboxComponent extends BaseControl<CheckboxComponentConfig> {
  protected config: CheckboxComponentConfig | null = null;
  public constructor() {
    super();
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

    this.listenFieldStatusChange();

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
}
