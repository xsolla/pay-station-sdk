import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { SubmitButtonAttributes } from './submit-button-attributes.enum';
import { getSubmitButtonTemplate } from './submit-button.template';
import { submitButtonHandler } from './submit-button.handler';

export class SubmitButtonComponent extends WebComponentAbstract {
  private readonly postMessagesClient: PostMessagesClient;
  private readonly headlessCheckout: HeadlessCheckout;

  private get elementRef(): HTMLButtonElement {
    return this.querySelector('button')! as HTMLButtonElement;
  }

  public constructor() {
    super();
    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  public static get observedAttributes(): string[] {
    return [SubmitButtonAttributes.isLoading, SubmitButtonAttributes.text];
  }

  protected connectedCallback(): void {
    super.render();

    this.addEventListenerToElement(this.elementRef, 'click', () => {
      if (this.getAttribute(SubmitButtonAttributes.isLoading)) {
        return;
      }

      this.setAttribute(SubmitButtonAttributes.isLoading, 'true');

      let isCheckedFieldStatuses = false;
      this.headlessCheckout.form.onFieldsStatusChange((fieldsStatus) => {
        if (isCheckedFieldStatuses) {
          return;
        }

        isCheckedFieldStatuses = true;

        const isInvalidForm = Object.entries(fieldsStatus).some((fields) => {
          const [, value] = fields;

          return value.validationStatus === 'INVALID';
        });

        if (isInvalidForm) {
          this.removeAttribute(SubmitButtonAttributes.isLoading);

          super.render();
        }
      });

      void this.postMessagesClient.send(
        { name: EventName.submitForm },
        submitButtonHandler,
      );

      super.render();
    });
  }

  protected getHtml(): string {
    const text = this.getAttribute(SubmitButtonAttributes.text) ?? '';
    const isLoading = !!this.getAttribute(SubmitButtonAttributes.isLoading);

    return getSubmitButtonTemplate(text, isLoading);
  }
}
