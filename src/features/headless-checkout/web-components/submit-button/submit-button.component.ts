import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { submitButtonHandler } from './submit-button.handler';
import { EventName } from '../../../../core/event-name.enum';

export class SubmitButtonComponent extends WebComponentAbstract {
  private readonly postMessagesClient: PostMessagesClient;

  private get elementRef(): HTMLButtonElement {
    return this.querySelector('button')! as HTMLButtonElement;
  }

  public constructor() {
    super();
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    super.render();

    this.addEventListenerToElement(this.elementRef, 'click', () => {
      void this.postMessagesClient.send(
        { name: EventName.submitForm },
        submitButtonHandler
      );
    });
  }

  protected getHtml(): string {
    return `
    <button>${this.getAttribute('text')!}</button>
    `;
  }
}
