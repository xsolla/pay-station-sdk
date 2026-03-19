import { container } from 'tsyringe';
import { LoggerService } from '../../../../core/exception-handling/logger.service';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import './redirect.component.scss';
import { redirectButtonTemplate } from './redirect.template';
import { RedirectAttributes } from './redirect-attributes.enum';
import { EventName } from '../../../../core/event-name.enum';

interface RedirectData {
  redirectUrl: string;
  data: { [key: string]: string };
  method?: string;
  isNewWindowRequired?: boolean;
  isSameWindowRequired?: boolean;
}

export class RedirectComponent extends WebComponentAbstract {
  private readonly window: Window;
  private readonly postMessageClient: PostMessagesClient;
  private readonly loggerService: LoggerService;

  private windowCloseWaitingTimer: number | null = null;

  private get elementRef(): HTMLElement {
    return this.querySelector('div')! as HTMLElement;
  }

  private get redirectButtonRef(): HTMLButtonElement {
    return this.querySelector('button')! as HTMLButtonElement;
  }

  private get redirectAttribute(): RedirectData | null {
    const redirectString = this.getAttribute(RedirectAttributes.redirect);

    if (!redirectString) {
      return null;
    }

    try {
      return JSON.parse(redirectString) as RedirectData;
    } catch (error: unknown) {
      this.loggerService.error('psdk-redirect: parse error', { error });
      return null;
    }
  }

  public constructor() {
    super();

    this.window = container.resolve(Window);
    this.postMessageClient = container.resolve(PostMessagesClient);
    this.loggerService = container.resolve(LoggerService);
  }

  public static get observedAttributes(): string[] {
    return [RedirectAttributes.redirect, RedirectAttributes.text];
  }

  protected connectedCallback(): void {
    this.handleRedirectFlow();
  }

  protected attributeChangedCallback(): void {
    this.handleRedirectFlow();
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.windowCloseWaitingTimer) {
      clearInterval(this.windowCloseWaitingTimer);
    }
  }

  protected getHtml(): string {
    if (this.redirectAttribute?.isNewWindowRequired) {
      return redirectButtonTemplate(
        this.getAttribute(RedirectAttributes.text) ?? '',
      );
    }

    return '<div></div>';
  }

  private handleRedirectFlow(): void {
    if (this.redirectAttribute) {
      this.render();

      const form = this.renderRedirectForm(this.redirectAttribute);
      const originalSubmit = form.submit.bind(form);

      form.submit = () => {
        setTimeout(() => {
          this.loggerService.info('psdk-redirect: open redirect window');
        }, 0);

        originalSubmit();
      };

      if (this.redirectButtonRef) {
        this.addEventListenerToElement(this.elementRef, 'click', () => {
          this.openRedirectInNewWindow(form);
        });
      }

      if (this.redirectAttribute.isSameWindowRequired) {
        this.openRedirectInSameWindow(form);
      }
    }
  }

  private openRedirectInSameWindow(form: HTMLFormElement): void {
    form.submit();
  }

  private openRedirectInNewWindow(form: HTMLFormElement): void {
    const redirectWindowTarget = 'redirect-window';
    const redirectWindow = this.window.open(
      'about:blank',
      redirectWindowTarget,
    );

    if (redirectWindow) {
      form.target = redirectWindowTarget;
    }

    const timerTickTime = 500;
    this.windowCloseWaitingTimer = setInterval(() => {
      if (redirectWindow?.closed) {
        clearInterval(this.windowCloseWaitingTimer!);
        this.sendCloseWindowEvent();
      }
    }, timerTickTime) as unknown as number;

    form.submit();
  }

  private renderRedirectForm(redirectData: RedirectData): HTMLFormElement {
    const target = this.getFormTarget(redirectData);
    const method =
      redirectData.method?.toUpperCase() === 'POST' ? 'POST' : 'GET';

    const attributes: { [key: string]: string } = {
      method: method,
      action: redirectData.redirectUrl,
      target,
    };

    const form = this.window.document.createElement('form');
    form.setAttribute('id', 'psdk-redirect-form');
    this.setElementAttributes(form, attributes);

    if (redirectData.data) {
      Object.entries(redirectData.data).forEach(([key, value]) => {
        const input = this.window.document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });
    }

    this.elementRef.append(form);
    form.target = target;

    return form;
  }

  private setElementAttributes(
    element: HTMLElement,
    attributes: { [key: string]: string },
  ): void {
    Object.keys(attributes).forEach((name) => {
      element.setAttribute(name, attributes[name]);
    });
  }

  private getFormTarget(redirectData: RedirectData): '_self' | '_blank' {
    if (redirectData?.isNewWindowRequired) {
      return '_blank';
    }
    return '_self';
  }

  private sendCloseWindowEvent(): void {
    this.dispatchEvent(new CustomEvent(EventName.redirectWindowClosed));

    this.postMessageClient.sendPublicMessage({
      name: EventName.redirectWindowClosed,
    });
  }
}
