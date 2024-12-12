import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../../core/web-components/web-component.abstract';
import { PostMessagesClient } from '../../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../../core/event-name.enum';
import { HeadlessCheckout } from '../../../headless-checkout';
import { DefaultSubmitButtonAttributes } from './default-submit-button-attributes.enum';
import { getSubmitButtonTemplate } from './default-submit-button.template';
import { submitHandler } from '../../../post-messages-handlers/submit/submit.handler';
import { Message } from '../../../../../core/message.interface';
import { Handler } from '../../../../../core/post-messages-client/handler.type';
import { isSubmitButtonLoadingMessage } from '../../../../../core/guards/submit-button-loading-message.guard';
import { isShowFieldsAction } from '../../../../../core/actions/is-show-fields-action.function';
import './default-submit-button.component.scss';

export class DefaultSubmitButtonComponent extends WebComponentAbstract {
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
    return [
      DefaultSubmitButtonAttributes.isLoading,
      DefaultSubmitButtonAttributes.text,
    ];
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    this.listenFormInit();
  }

  protected render(): void {
    this.removeAllEventListeners();
    this.innerHTML = this.getHtml();
    if (this.elementRef) {
      this.addEventListenerToElement(this.elementRef, 'click', () => {
        if (this.getAttribute(DefaultSubmitButtonAttributes.isLoading)) {
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
            this.removeAttribute(DefaultSubmitButtonAttributes.isLoading);

            this.render();
          }
        });

        void this.postMessagesClient.send(
          { name: EventName.submitForm },
          submitHandler,
        );

        this.render();
      });
    }
  }

  protected getHtml(): string {
    const text = this.getAttribute(DefaultSubmitButtonAttributes.text) ?? '';
    const isLoading = !!this.getAttribute(
      DefaultSubmitButtonAttributes.isLoading,
    );

    return getSubmitButtonTemplate(text, isLoading);
  }

  private listenFormInit(): void {
    this.headlessCheckout.form.onNextAction((nextAction) => {
      if (isShowFieldsAction(nextAction)) {
        this.removeAttribute(DefaultSubmitButtonAttributes.isLoading);
        this.render();
      }
    });
  }

  private readonly loadingHandler: Handler<void> = (
    message: Message,
  ): { isHandled: boolean } | null => {
    if (!isSubmitButtonLoadingMessage(message)) return null;

    const isCanClick = message.data?.formStatus === 'VALID';

    if (isCanClick) {
      this.setAttribute(DefaultSubmitButtonAttributes.isLoading, 'true');
      this.render();
    }
    return {
      isHandled: true,
    };
  };
}
