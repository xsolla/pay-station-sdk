import { BaseControl } from '../base-control/base-control.abstract';
import {
  getSelectComponentTemplate,
  getSelectOptionTemplate,
} from './select.template';
import { SelectAttributes } from './select-attributes.enum';
import { SelectComponentConfig } from './select-component.config.interface';

export class SelectComponent extends BaseControl<SelectComponentConfig> {
  protected config: SelectComponentConfig | null = null;

  private selectedOptionValue = '';
  private isOpened = false;

  private get rootElement(): this | ShadowRoot {
    return this.shadowRoot ?? this;
  }

  public constructor() {
    super();
  }

  public get nameAttr(): string {
    return this.getAttribute(SelectAttributes.name) ?? '';
  }

  public static get observedAttributes(): string[] {
    return [SelectAttributes.name];
  }

  protected connectedCallback(): void {
    this.controlName = this.nameAttr;

    if (!this.controlName) {
      return;
    }

    this.listenFieldStatusChange();

    void this.getComponentConfig(this.controlName).then((config) => {
      this.config = config;

      this.render();
    });
  }

  protected attributeChangedCallback(): void {
    if (!this.controlName) {
      return this.connectedCallback();
    }

    super.attributeChangedCallback();
  }

  protected getHtml(): string {
    if (!this.config) {
      return '';
    }

    return getSelectComponentTemplate(this.config);
  }

  protected render(): void {
    super.render();

    this.addOptions();

    this.addHandlers();
  }

  private openDropdown(): void {
    this.isOpened = true;

    const dropdownWrapper = this.rootElement.querySelector('#dropdown-wrapper');
    const dropdownIcon = this.rootElement.querySelector('#dropdown-icon');

    if (dropdownWrapper) {
      dropdownWrapper.classList.add('dropdown-opened');
    }

    if (dropdownIcon) {
      dropdownIcon.classList.remove('arrow-down');
      dropdownIcon.classList.add('arrow-up');
    }
  }

  private closeDropdown(): void {
    this.isOpened = false;

    const dropdownWrapper = this.rootElement.querySelector('#dropdown-wrapper');
    const dropdownIcon = this.rootElement.querySelector('#dropdown-icon');

    if (dropdownWrapper) {
      dropdownWrapper.classList.remove('dropdown-opened');
    }

    if (dropdownIcon) {
      dropdownIcon.classList.remove('arrow-up');
      dropdownIcon.classList.add('arrow-down');
    }
  }

  private addHandlers(): void {
    this.removeAllEventListeners();

    const button = this.rootElement.querySelector('#select-button');
    const options = this.rootElement.querySelector('#select-options');

    if (button) {
      this.addEventListenerToElement(button, 'click', () =>
        this.onButtonClick(),
      );
      this.addEventListenerToElement(button, 'blur', () => this.onButtonBlur());
    }

    if (options) {
      this.addEventListenerToElement(options, 'click', (event) =>
        this.onSelectOption(event),
      );
    }

    // hack to store global event
    this.addEventListenerToElement(
      this.window as unknown as Element,
      'click',
      (event) => this.onClickOutside(event),
    );
  }

  private addOptions(): void {
    const optionsElement = this.rootElement.querySelector('#select-options');

    if (optionsElement && this.config?.options) {
      let optionsTemplate = '';

      this.config.options.forEach((option) => {
        optionsTemplate += getSelectOptionTemplate(option);
      });

      optionsElement.innerHTML = optionsTemplate;
    }
  }

  private onButtonClick(): void {
    this.openDropdown();

    this.notifyOnFocusEvent();
  }

  private onButtonBlur(): void {
    this.notifyOnBlurEvent();
  }

  private onClickOutside(event: Event): void {
    if (!event.target) {
      return;
    }

    if (
      this.isOpened &&
      !this.rootElement.contains(event.target as HTMLElement)
    ) {
      this.closeDropdown();
    }
  }

  private onSelectOption(event: Event): void {
    const eventTarget = event.target as HTMLElement;

    if (!eventTarget) {
      return;
    }

    const optionValue = eventTarget.getAttribute('data-option-value');

    if (!optionValue) {
      return;
    }

    this.selectedOptionValue = optionValue;

    const selectedOptionElement =
      this.rootElement.querySelector('#select-content');
    const selectedOption = this.config?.options?.find(
      (option) => this.selectedOptionValue == option.value,
    );

    if (selectedOptionElement) {
      selectedOptionElement.innerHTML = selectedOption?.label ?? '';
    }

    this.closeDropdown();

    this.notifyOnValueChanges(this.selectedOptionValue);
  }
}
