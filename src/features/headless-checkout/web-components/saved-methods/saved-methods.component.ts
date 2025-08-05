import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { HeadlessCheckout } from '../../headless-checkout';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { container } from 'tsyringe';
import { SavedMethod } from '../../../../core/saved-method.interface';
import { getSavedMethodTemplate } from './saved-method.template';
import { SavedMethodsAttributes } from './saved-methods-attributes.enum';
import { SavedMethodAttributes } from './saved-method-attributes.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { deleteSavedMethodHandler } from '../../post-messages-handlers/delete-saved-method.handler';
import { EventName } from '../../../../core/event-name.enum';
import './saved-methods.component.scss';
import { cdnIconsUrl } from '../../environment';

export class SavedMethodsComponent extends WebComponentAbstract {
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private readonly window: Window;
  private readonly postMessagesClient: PostMessagesClient;
  private readonly deleteIcon = `${cdnIconsUrl}/common-icons/trash-can--line.svg`;

  private savedMethods?: SavedMethod[];

  private get listRef(): HTMLElement {
    return this.querySelector('ul') as HTMLElement;
  }

  private get notFoundValue(): string {
    return this.getAttribute(SavedMethodsAttributes.notFound) ?? '';
  }

  private get deleteMode(): string {
    return this.getAttribute(SavedMethodsAttributes.deleteMode) ?? '';
  }

  public constructor() {
    super();

    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.window = container.resolve(Window);
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  public static get observedAttributes(): string[] {
    return [SavedMethodsAttributes.deleteMode];
  }

  protected attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (
      !this.headlessCheckoutSpy.appWasInit ||
      name !== SavedMethodsAttributes.deleteMode
    ) {
      return;
    }
    if (this.isDeleteMode(newValue)) {
      const savedMethodLinks = this.querySelectorAll('.saved-method a');

      savedMethodLinks.forEach((el) => {
        el.appendChild(this.createDeleteButton());
      });

      return;
    }

    this.removeAllDeleteButton();
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    this.loadSavedMethods();
  }

  protected getHtml(): string {
    const savedMethodsHtml = this.getMethodsHtml();
    return `
      <ul class='saved-methods'>
        ${savedMethodsHtml ? savedMethodsHtml.join('') : this.notFoundValue}
      </ul>
    `;
  }

  private loadSavedMethods(): void {
    void this.headlessCheckout
      .getSavedMethods()
      .then(this.savedMethodsLoadedHandler);
  }

  private readonly savedMethodsLoadedHandler = (
    savedMethods: SavedMethod[],
  ): void => {
    this.savedMethods = savedMethods;
    super.render();
    this.listenClicks();
  };

  private getMethodsHtml(): string[] | null {
    if (this.savedMethods?.length) {
      return this.savedMethods.map((method) =>
        getSavedMethodTemplate(method, this.isDeleteMode(this.deleteMode)),
      );
    }

    return null;
  }

  private listenClicks(): void {
    this.addEventListenerToElement(this.listRef, 'click', (event) => {
      event.preventDefault();

      const target = event.target as HTMLElement;
      const button = target.closest('button.psdk-delete-saved-method-button');

      if (button) {
        this.deleteButtonClick(button as HTMLButtonElement);
        return;
      }

      if (
        target instanceof HTMLElement &&
        !this.isDeleteMode(this.deleteMode)
      ) {
        this.dispatchSelectionEvent(target);
      }
    });
  }

  private dispatchSelectionEvent(target: HTMLElement): void {
    if (!this.getSavedMethodData(target).savedMethodId) {
      return;
    }

    const eventOptions = {
      bubbles: true,
      composed: true,
      detail: {
        ...this.getSavedMethodData(target),
      },
    };

    this.listRef.dispatchEvent(
      new CustomEvent(EventName.savedMethodSelected, eventOptions),
    );
  }

  private dispatchDeleteMethodStatus(isDeleteSuccessful: boolean): void {
    const eventOptions = {
      bubbles: true,
      composed: true,
      detail: {
        isDeleteSuccessful,
      },
    };

    this.listRef.dispatchEvent(
      new CustomEvent(EventName.deletedSavedMethodStatus, eventOptions),
    );
  }

  private getSavedMethodData(target: HTMLElement): {
    paymentMethodId: string | null | undefined;
    savedMethodId: string | null | undefined;
    type: string | null | undefined;
  } {
    return {
      paymentMethodId: target
        .closest('li')
        ?.getAttribute(SavedMethodAttributes.paymentMethodId),
      savedMethodId: target
        .closest('li')
        ?.getAttribute(SavedMethodAttributes.savedMethodId),
      type: target.closest('li')?.getAttribute(SavedMethodAttributes.type),
    };
  }

  private removeAllDeleteButton(): void {
    const buttons = this.querySelectorAll('.psdk-delete-saved-method-button');

    for (const button of buttons) {
      button.remove();
    }
  }

  private deleteButtonClick(target: HTMLButtonElement): void {
    const savedMethodData = this.getSavedMethodData(target);
    void this.postMessagesClient
      .send(
        {
          name: EventName.deleteSavedMethod,
          data: { ...savedMethodData },
        },
        deleteSavedMethodHandler,
      )
      .then((isDeleteSuccessful) => {
        this.dispatchDeleteMethodStatus(isDeleteSuccessful as boolean);

        if (isDeleteSuccessful) {
          this.removeSavedMethodFromList(savedMethodData.savedMethodId!);
        }
      });
  }

  private removeSavedMethodFromList(savedMethodId: string): void {
    this.querySelector(
      `li[${SavedMethodAttributes.savedMethodId}="${savedMethodId}"]`,
    )?.remove();
  }

  private createDeleteButton(): HTMLButtonElement {
    const button = this.window.document.createElement('button');
    button.className = 'psdk-delete-saved-method-button';

    const deleteIconElement = this.window.document.createElement('img');
    deleteIconElement.src = this.deleteIcon;
    button.appendChild(deleteIconElement);
    button.style.cursor = 'pointer';

    return button;
  }

  private isDeleteMode(attributeValue: string): boolean {
    return attributeValue === 'true';
  }
}
