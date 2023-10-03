import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { TextComponentAttributes } from './text-component-attributes.enum';
import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { getTextComponentTemplate } from './text.compontent.template';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { TextComponentConfig } from './text.component.config.interface';
import { getTextComponentConfigHandler } from './get-text-component-config.handler';
import { HeadlessCheckout } from '../../headless-checkout';
import { ValidationErrors } from '../../../../core/form/validation-errors.interface';

export class TextComponent extends SecureComponentAbstract {
  private readonly formSpy: FormSpy;
  private readonly window: Window;
  private config?: TextComponentConfig;
  private readonly postMessagesClient: PostMessagesClient;
  private readonly headlessCheckout: HeadlessCheckout;
  private isListeningFieldStatusChange = false;

  public constructor() {
    super();
    this.formSpy = container.resolve(FormSpy);
    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.window = container.resolve(Window);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
  }

  public static get observedAttributes(): string[] {
    return [TextComponentAttributes.name];
  }

  protected connectedCallback(): void {
    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.getConfigFromInputName());
      return;
    }

    this.getConfigFromInputName();
  }

  protected async getTextComponentConfig(
    inputName: string,
  ): Promise<TextComponentConfig> {
    const msg: Message<{ inputName: string }> = {
      name: EventName.getTextComponentConfig,
      data: {
        inputName,
      },
    };

    return this.postMessagesClient.send<TextComponentConfig>(msg, (message) => {
      return getTextComponentConfigHandler(message, (controlName) => {
        return msg.data?.inputName === controlName;
      });
    }) as Promise<TextComponentConfig>;
  }

  protected readonly configLoadedHandler = (
    config: TextComponentConfig,
    componentName: string,
  ): void => {
    this.config = config;
    this.componentName = componentName;
    super.render();
  };

  protected attributeChangedCallback(): void {
    this.connectedCallback();
  }

  protected getHtml(): string {
    const secureHtml = this.getSecureHtml();
    return getTextComponentTemplate({
      title: this.config?.title,
      tooltip: this.config?.tooltip,
      error: this.config?.error,
      secureHtml,
    });
  }

  private getConfigFromInputName(): void {
    const inputName = this.getAttribute(TextComponentAttributes.name);

    if (!inputName) {
      return;
    }

    this.listenFieldStatusChange(inputName);

    void this.getTextComponentConfig(inputName).then((config) => {
      this.configLoadedHandler(config, `text-input/${inputName}`);
    });
  }

  private listenFieldStatusChange(controlName: string): void {
    if (this.isListeningFieldStatusChange) {
      return;
    }

    this.isListeningFieldStatusChange = true;
    this.headlessCheckout.form.onFieldsStatusChange((fieldsStatus) => {
      const fieldStatus = fieldsStatus[controlName];

      if (!this.config || !fieldStatus) {
        return;
      }

      this.config.error = this.getFirstError(fieldStatus.errors);
      this.updateError(fieldStatus.isFocused);
    });
  }

  private updateError(isFieldInFocus: boolean | undefined): void {
    const rootElement = this.shadowRoot ?? this;
    const errorElement = rootElement.querySelector('.field-error');

    if (this.config?.error && !isFieldInFocus) {
      if (!errorElement) {
        const newErrorElement = this.window.document.createElement('div');
        newErrorElement.classList.add('field-error');
        newErrorElement.textContent = this.config.error;
        rootElement.appendChild(newErrorElement);
      } else {
        errorElement.textContent = this.config.error;
      }
    } else {
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  private getFirstError(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }

    const firstErrorKey: string = Object.keys(errors)[0];
    return errors[firstErrorKey]?.message ?? null;
  }
}
