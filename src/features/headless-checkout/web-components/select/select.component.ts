import { BaseControl } from '../base-control/base-control.abstract';
import {
  getSelectComponentTemplate,
  getSelectOptionTemplate,
} from './select.template';
import { SelectAttributes } from './select-attributes.enum';
import { SelectComponentConfig } from './select-component.config.interface';
import './select.component.scss';
import { SelectKeys } from './select-keys.enum';

export class SelectComponent extends BaseControl<SelectComponentConfig> {
  protected config: SelectComponentConfig | null = null;

  private selectedOptionValue = '';
  private isOpened = false;
  private selectedOptionIndex!: number;
  private currentHoverOptionIndex!: number;

  private get rootElement(): this | ShadowRoot {
    return this.shadowRoot ?? this;
  }

  public get options(): HTMLElement | null {
    return this.rootElement.querySelector('#select-options');
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
      console.log(config);

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

  private toggleDropdown(): void {
    this.isOpened = !this.isOpened;

    const dropdownWrapper = this.rootElement.querySelector('#dropdown-wrapper');
    const dropdownIcon = this.rootElement.querySelector('#dropdown-icon');

    if (!dropdownWrapper || !dropdownIcon) {
      return;
    }

    dropdownWrapper.classList.toggle('dropdown-opened', this.isOpened);
    dropdownIcon.classList.toggle('arrow-down', !this.isOpened);
    dropdownIcon.classList.toggle('arrow-up', this.isOpened);
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

    if (!button || !this.options) {
      return;
    }

    this.addEventListenerToElement(button, 'click', () => this.onButtonClick());

    this.addEventListenerToElement(button, 'blur', () => this.onButtonBlur());

    this.addEventListenerToElement(this.options, 'click', (event) =>
      this.onSelectOption(event),
    );

    this.addEventListenerToElement(button, 'keydown', (event) => {
      const { key: keyEvent, code } = event as KeyboardEvent;
      const key = keyEvent.toLowerCase();

      const optionsElements = Array.from(
        this.options!.children,
      ) as HTMLElement[];

      if (key.length === 1 && /[a-z]/i.test(key)) {
        this.handleLetterKey(key, optionsElements);
        return;
      }

      if (key === SelectKeys.enter || code === SelectKeys.space) {
        this.handleEnterOrSpaceKey(event as KeyboardEvent);
        return;
      }

      if (
        (key === SelectKeys.arrowUp || key === SelectKeys.arrowDown) &&
        this.isOpened
      ) {
        this.handleArrowKey(key);
      }
    });

    // hack to store global event
    this.addEventListenerToElement(
      this.window as unknown as Element,
      'click',
      (event) => this.onClickOutside(event),
    );
  }

  private addOptions(): void {
    if (this.options && this.config?.options) {
      let optionsTemplate = '';

      this.selectedOptionIndex = this.config.options.findIndex(
        (option) => option.value === this.config?.initValue,
      );
      this.currentHoverOptionIndex = 0;

      this.config.options.forEach((option, index) => {
        optionsTemplate += getSelectOptionTemplate(option, index);
      });

      this.options.innerHTML = optionsTemplate;
      const focusedOption = this.options.children[
        this.selectedOptionIndex
      ] as HTMLElement;

      if (focusedOption) {
        this.setFocusedClass(focusedOption);
      }
    }
  }

  private onButtonClick(): void {
    this.toggleDropdown();

    if (this.isOpened) {
      this.notifyOnFocusEvent();
    }
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

  private handleLetterKey(key: string, optionsElements: HTMLElement[]): void {
    const activeElements = this.options?.querySelectorAll('.active');
    activeElements?.forEach((element) =>
      this.removeActiveClass(element as HTMLElement),
    );

    for (let index = 0; index < optionsElements.length; index++) {
      if (
        optionsElements[index].getAttribute('data-option-key-letter') === key
      ) {
        this.currentHoverOptionIndex = index;
        this.setActiveClass(optionsElements[index]);
        optionsElements[index].focus();
        optionsElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
        break;
      }
    }
  }

  private handleEnterOrSpaceKey(event: KeyboardEvent): void {
    const option = this.options?.querySelector('.active') as HTMLElement | null;
    if (!option) {
      return;
    }

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    option.children[0].dispatchEvent(clickEvent);
    event.preventDefault();
  }

  private handleArrowKey(key: string): void {
    const activeElements = this.options?.querySelectorAll('.active');
    activeElements?.forEach((element) =>
      this.removeActiveClass(element as HTMLElement),
    );

    if (key === SelectKeys.arrowUp && this.currentHoverOptionIndex !== 0) {
      this.currentHoverOptionIndex--;
    }

    if (
      this.config?.options?.length &&
      key === SelectKeys.arrowDown &&
      this.currentHoverOptionIndex !== this.config?.options?.length - 1
    ) {
      this.currentHoverOptionIndex++;
    }

    const option = this.options?.querySelector(
      `[data-option-index='${this.currentHoverOptionIndex}']`,
    );

    if (!option) {
      return;
    }

    this.setActiveClass(option as HTMLElement);

    option.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  private onSelectOption(event: Event): void {
    const eventTarget = event.target as HTMLElement;

    if (!eventTarget) {
      return;
    }

    const optionValue = this.getOptionValue(eventTarget);
    const optionIndex = this.getOptionIndex(eventTarget);
    const previousOption = this.getOptionByIndex(this.selectedOptionIndex);

    if (optionValue && optionIndex && previousOption) {
      this.removeFocusedClass(previousOption as HTMLElement);

      this.selectedOptionValue = optionValue;
      this.selectedOptionIndex = this.currentHoverOptionIndex =
        Number(optionIndex);

      const selectedOptionElement =
        this.rootElement.querySelector('#select-content');

      const selectedOption = this.config?.options?.find(
        (option) => this.selectedOptionValue === option.value,
      );

      if (selectedOptionElement && eventTarget.parentElement) {
        selectedOptionElement.innerHTML = selectedOption?.label ?? '';

        this.setFocusedClass(eventTarget.parentElement);

        this.closeDropdown();

        this.notifyOnValueChanges(this.selectedOptionValue);
      }
    }
  }

  private getOptionValue(target: HTMLElement): string | null {
    return target.getAttribute('data-option-value');
  }

  private getOptionIndex(target: HTMLElement): string | null {
    return target.parentElement?.getAttribute('data-option-index') ?? null;
  }

  private getOptionByIndex(index: number): Element | null {
    return (
      this.options?.querySelector(`[data-option-index='${index}']`) ?? null
    );
  }

  private setActiveClass(element: HTMLElement): void {
    element.classList.add('active');
  }

  private removeActiveClass(element: HTMLElement): void {
    element.classList.remove('active');
  }

  private setFocusedClass(element: HTMLElement): void {
    element.classList.add('focused');
  }

  private removeFocusedClass(element: HTMLElement): void {
    element.classList.remove('focused');
  }
}
