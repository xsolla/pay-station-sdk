/* eslint-disable @typescript-eslint/no-unused-vars */
import { isLoadingCssClassName } from '../../shared/loading-state/is-loading-css-class-name.const';
import { createFinishLoadingEvent } from '../../shared/loading-state/dispatch-finish-loading-event.function';

export abstract class WebComponentAbstract extends HTMLElement {
  protected eventListeners: Array<{
    element: Element;
    eventType: string;
    listener(event: Event): void;
  }> = [];

  protected abstract getHtml(): string;

  protected connectedCallback(): void {
    this.render();
  }

  protected disconnectedCallback(): void {
    this.removeAllEventListeners();
  }

  protected addEventListenerToElement(
    element: Element,
    eventType: string,
    listener: (event: Event) => void
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

  protected render(): void {
    this.innerHTML = this.getHtml();
  }

  protected static get observedAttributes(): string[] {
    return [];
  }

  protected attributeChangedCallback(
    name?: string,
    oldValue?: string,
    newValue?: string
  ): void {
    this.render();
  }

  protected getNumberAttribute(name: string): number | null {
    const stringValue = this.getAttribute(name);

    if (!stringValue) {
      return null;
    }

    const numberValue = parseFloat(stringValue);

    if (isNaN(numberValue)) {
      return null;
    }

    return numberValue;
  }

  protected getJsonOrNull(data: string): unknown | null {
    try {
      return JSON.parse(data);
    } catch (err: unknown) {
      return null;
    }
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
  }
}
