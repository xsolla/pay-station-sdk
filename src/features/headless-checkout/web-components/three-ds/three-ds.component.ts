import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { CheckoutForm } from '../../../../core/actions/three-ds/checkout-form.interface';
import { ThreeDsAttributes } from './three-ds-attributes.enum';
import { threeDsRedirectButtonTemplate } from './three-ds.template';
import './three-ds.component.scss';
import { EventName } from '../../../../core/event-name.enum';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';

export class ThreeDsComponent extends WebComponentAbstract {
  private readonly window: Window;
  private readonly postMessageClient: PostMessagesClient;
  private windowCloseWaitingTimer: number | null = null;

  private get elementRef(): HTMLElement {
    return this.querySelector('div')! as HTMLElement;
  }

  private get redirectButtonRef(): HTMLButtonElement {
    return this.querySelector('button')! as HTMLButtonElement;
  }

  private get challengeAttribute(): CheckoutForm | null {
    const challengeString = this.getAttribute(ThreeDsAttributes.challenge);

    if (!challengeString) {
      return null;
    }

    try {
      return JSON.parse(challengeString) as CheckoutForm;
    } catch (error: unknown) {
      return null;
    }
  }

  public constructor() {
    super();

    this.window = container.resolve(Window);
    this.postMessageClient = container.resolve(PostMessagesClient);
  }

  public static get observedAttributes(): string[] {
    return [ThreeDsAttributes.challenge, ThreeDsAttributes.text];
  }

  protected connectedCallback(): void {
    this.handleChallengeFlow();
  }

  protected attributeChangedCallback(): void {
    this.handleChallengeFlow();
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.windowCloseWaitingTimer) {
      clearInterval(this.windowCloseWaitingTimer);
    }
  }

  protected getHtml(): string {
    if (this.challengeAttribute?.redirect.isNewWindowRequired) {
      return threeDsRedirectButtonTemplate(
        this.getAttribute(ThreeDsAttributes.text) ?? '',
      );
    }

    return '<div></div>';
  }

  private handleChallengeFlow(): void {
    if (this.challengeAttribute) {
      this.render();

      const form = this.renderChallengeWindowForm(this.challengeAttribute);

      // case for external window
      if (this.redirectButtonRef) {
        this.addEventListenerToElement(this.elementRef, 'click', () => {
          this.openChallengeWindowInNewWindow(form);
        });
      }

      // will open on same window
      if (this.challengeAttribute.redirect.isSameWindowRequired) {
        this.openChallengeWindowInSameWindow(form);
      }
    }
  }

  private renderChallengeWindowForm(
    checkoutFormData: CheckoutForm,
  ): HTMLFormElement {
    const target = this.getFormTarget(checkoutFormData);
    const attributes: { [key: string]: string } = {
      method: checkoutFormData.method,
      action: checkoutFormData.action,
      target,
    };

    const form = this.window.document.createElement('form');

    form.setAttribute('id', 'psdk-3ds-form');

    this.setElementAttributes(form, attributes);

    if (checkoutFormData.params) {
      for (const param in checkoutFormData.params) {
        const input = this.window.document.createElement('input');
        input.type = 'hidden';
        input.name = param;
        input.value = checkoutFormData.params[param];

        form.appendChild(input);
      }
    }

    this.elementRef.append(form);

    form.target = target;

    return form;
  }

  private openChallengeWindowInSameWindow(form: HTMLFormElement): void {
    this.window.open('', '_self');

    form.submit();
  }

  private openChallengeWindowInNewWindow(form: HTMLFormElement): void {
    const challengeWindowTarget = 'three-ds-challenge-window';
    const challengeWindow = this.window.open(
      'about:blank',
      challengeWindowTarget,
    );

    if (challengeWindow) {
      form.target = challengeWindowTarget;
    }

    const timerTickTime = 500;
    this.windowCloseWaitingTimer = setInterval(() => {
      if (challengeWindow?.closed) {
        clearInterval(this.windowCloseWaitingTimer!);
        this.sendCloseWindowEvent();
      }
    }, timerTickTime) as unknown as number;

    form.submit();
  }

  private setElementAttributes(
    element: HTMLElement,
    attributes: { [key: string]: string },
  ): void {
    Object.keys(attributes).forEach((name) => {
      element.setAttribute(name, attributes[name]);
    });
  }

  private getFormTarget(checkoutFormData: CheckoutForm): '_self' | '_blank' {
    const redirectParams = checkoutFormData?.redirect;

    if (redirectParams?.isNewWindowRequired) {
      return '_blank';
    }

    return '_self';
  }

  private sendCloseWindowEvent(): void {
    this.dispatchEvent(new CustomEvent(EventName.threeDsWindowClosed));

    this.postMessageClient.sendPublicMessage({
      name: EventName.threeDsWindowClosed,
    });
  }
}
