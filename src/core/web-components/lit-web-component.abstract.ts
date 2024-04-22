/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormLoader } from '../form/form-loader';
import { container } from 'tsyringe';
import { createFinishLoadingEvent } from '../../shared/loading-state/dispatch-finish-loading-event.function';
import { isLoadingCssClassName } from '../../shared/loading-state/is-loading-css-class-name.const';
import { html, LitElement, TemplateResult } from 'lit';

export abstract class LitWebComponentAbstract extends LitElement {
  protected formLoader: FormLoader = container.resolve(FormLoader);

  protected eventListeners: Array<{
    element: Element;
    eventType: string;
    listener(event: Event): void;
  }> = [];

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeAllEventListeners();
  }

  public createRenderRoot(): LitElement {
    return this;
  }

  protected abstract render(): void;

  protected renderByCondition(
    condition: boolean,
    template: TemplateResult<1>,
    defaultValue: TemplateResult<1> = html``,
  ): TemplateResult<1> {
    return condition ? template : defaultValue;
  }

  protected addEventListenerToElement(
    element: Element,
    eventType: string,
    listener: (event: Event) => void,
  ): void {
    element.addEventListener(eventType, listener);
    this.eventListeners.push({ element, eventType, listener });
  }

  protected removeAllEventListeners(): void {
    this.eventListeners.forEach((item) => {
      item.element.removeEventListener(item.eventType, item.listener);
    });
    this.eventListeners = [];
  }

  protected getJsonOrNull(data: string): unknown | null {
    try {
      return JSON.parse(data);
    } catch (err: unknown) {
      return null;
    }
  }

  protected finishLoadingFormControlHandler(componentName: string): void {
    this.formLoader.setFieldLoaded(componentName);
  }

  protected startLoadingComponentHandler(): void {
    this.classList.add(isLoadingCssClassName);
  }

  protected finishLoadingComponentHandler(componentName: string): void {
    this.classList.remove(isLoadingCssClassName);
    this.dispatchFinishLoadingEvent(componentName);
  }

  protected dispatchFinishLoadingEvent(componentName: string): void {
    this.dispatchEvent(createFinishLoadingEvent(componentName));
    this.formLoader.setFieldLoaded(componentName);
  }
}
