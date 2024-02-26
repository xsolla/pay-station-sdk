import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { SubmitButtonAttributes } from './submit-button-attributes.enum';
import { getSubmitButtonTemplate } from './submit-button.template';
import { submitButtonHandler } from './submit-button.handler';
import { Message } from '../../../../core/message.interface';
import { Handler } from '../../../../core/post-messages-client/handler.type';
import { isSubmitButtonLoadingMessage } from '../../../../core/guards/submit-button-loading-message.guard';

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

  protected render(): void {
    this.removeAllEventListeners();
    this.innerHTML = this.getHtml();

    if (this.elementRef) {
      this.addEventListenerToElement(this.elementRef, 'click', () => {
        if (this.getAttribute(SubmitButtonAttributes.isLoading)) {
          return;
        }

        void this.postMessagesClient.send(
          { name: EventName.getFormStatus },
          this.loadingHandler,
        );

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

            this.render();
          }
        });

        void this.postMessagesClient.send(
          { name: EventName.submitForm },
          submitButtonHandler,
        );

        this.render();
      });
    }
  }

  protected getHtml(): string {
    const text = this.getAttribute(SubmitButtonAttributes.text) ?? '';
    const isLoading = !!this.getAttribute(SubmitButtonAttributes.isLoading);

    return getSubmitButtonTemplate(text, isLoading);
  }

  private readonly loadingHandler: Handler<void> = (
    message: Message,
  ): { isHandled: boolean } | null => {
    if (!isSubmitButtonLoadingMessage(message)) return null;

    const isCanClick = message.data?.formStatus === 'VALID';

    if (isCanClick) {
      this.setAttribute(SubmitButtonAttributes.isLoading, 'true');
      this.render();
    }
    return {
      isHandled: true,
    };
  };
}
