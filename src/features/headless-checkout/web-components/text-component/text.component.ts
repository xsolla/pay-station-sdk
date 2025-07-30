import { SecureComponentAbstract } from '../../../../core/web-components/secure-component/secure-component.abstract';
import { TextComponentAttributes } from './text-component-attributes.enum';
import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { getTextComponentTemplate } from './text.compontent.template';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { ControlComponentConfig } from '../control-component-config.interface';
import { getControlComponentConfigHandler } from '../get-control-component-config.handler';
import { HeadlessCheckout } from '../../headless-checkout';
import { TextComponentConfig } from './text-component.config.interface';
import { FieldStatus } from '../../../../core/form/field-status.interface';
import { finishLoadComponentHandler } from '../../post-messages-handlers/finish-load-component.handler';
import { ValidationErrorService } from '../../../../core/form/validation-error/validation-error.service';

export class TextComponent extends SecureComponentAbstract {
  protected config?: TextComponentConfig;
  protected readonly postMessagesClient: PostMessagesClient;
  protected readonly window: Window;
  protected readonly formSpy: FormSpy;

  private readonly headlessCheckout: HeadlessCheckout;
  private readonly validationErrorService: ValidationErrorService;
  private isListeningFieldStatusChange = false;
  private inputName?: string | null;

  public constructor() {
    super();
    this.formSpy = container.resolve(FormSpy);
    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.window = container.resolve(Window);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.validationErrorService = container.resolve(ValidationErrorService);

    this.headlessCheckout.events.onCoreEvent(
      EventName.finishLoadComponent,
      finishLoadComponentHandler,
      (res) => {
        if (res?.fieldName && res?.fieldName === this.inputName) {
          this.finishLoadingFormControlHandler(this.inputName);
        }
      },
    );
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

  protected async getControlComponentConfig(
    inputName: string,
  ): Promise<TextComponentConfig> {
    const msg: Message<{ inputName: string }> = {
      name: EventName.getControlComponentConfig,
      data: {
        inputName,
      },
    };

    return this.postMessagesClient.send<ControlComponentConfig>(
      msg,
      (message) => {
        return getControlComponentConfigHandler(message, (controlName) => {
          return msg.data?.inputName === controlName;
        });
      },
    ) as Promise<TextComponentConfig>;
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
    if (!this.inputName) {
      return;
    }

    super.attributeChangedCallback();
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
    this.inputName = this.getAttribute(TextComponentAttributes.name);
    if (!this.inputName) {
      return;
    }

    this.listenFieldStatusChange(this.inputName);

    void this.getControlComponentConfig(this.inputName).then((config) => {
      this.configLoadedHandler(config, `text-input/${this.inputName!}`);
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

      this.config.error = this.validationErrorService.getMessage(
        fieldStatus.errors,
      );

      this.updateError(fieldStatus);
    });
  }

  private updateError(fieldStatus: FieldStatus): void {
    const rootElement = this.shadowRoot ?? this;
    const errorElement = rootElement.querySelector('.field-error');

    if (this.config?.error && fieldStatus.isTouched && !fieldStatus.isFocused) {
      if (!errorElement) {
        const newErrorElement = this.window.document.createElement('div');
        newErrorElement.classList.add('field-error');
        newErrorElement.innerHTML = this.config.error;
        rootElement.appendChild(newErrorElement);
      } else {
        errorElement.innerHTML = this.config.error;
      }
    } else {
      if (errorElement) {
        errorElement.remove();
      }
    }
  }
}
