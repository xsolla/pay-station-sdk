import { TextComponentAttributes } from './text-component-attributes.enum';
import { container } from 'tsyringe';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { ControlComponentConfig } from '../control-component-config.interface';
import { getControlComponentConfigHandler } from '../get-control-component-config.handler';
import { HeadlessCheckout } from '../../headless-checkout';
import { ValidationErrors } from '../../../../core/form/validation-errors.interface';
import { TextComponentConfig } from './text-component.config.interface';
import { finishLoadComponentHandler } from '../../post-messages-handlers/finish-load-component.handler';
import { LitSecureComponentAbstract } from '../../../../core/web-components/secure-component/lit-secure-component.abstract';
import { html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('psdk-text')
export class TextComponent extends LitSecureComponentAbstract {
  @property({ attribute: TextComponentAttributes.name })
  protected inputName = '';

  @property({ attribute: false })
  protected config?: TextComponentConfig;

  @property({ attribute: false })
  protected showError: boolean = false;

  protected readonly postMessagesClient: PostMessagesClient =
    container.resolve(PostMessagesClient);
  protected readonly window: Window = container.resolve(Window);
  protected readonly formSpy: FormSpy = container.resolve(FormSpy);

  private readonly headlessCheckout: HeadlessCheckout =
    container.resolve(HeadlessCheckout);
  private isListeningFieldStatusChange = false;

  public constructor() {
    super();

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

  public connectedCallback(): void {
    super.connectedCallback();

    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.getConfigFromInputName());
      return;
    }

    this.getConfigFromInputName();
  }

  protected render(): TemplateResult<1> {
    if (!this.formSpy.formWasInit || !this.componentName) {
      return html``;
    }

    return this.getTextComponentTemplate();
  }

  protected getTextComponentTemplate(
    additionalControls?: TemplateResult<1> | null,
  ): TemplateResult<1> {
    const { title, tooltip, error } = this.config ?? {};

    return html`
      ${this.renderByCondition(
        !!title,
        html` <div class="label">${title}</div>`,
      )}
      ${this.renderByCondition(
        !!tooltip?.text,
        html` <div class="description">${tooltip?.text}</div>`,
      )}
      ${this.renderSecureComponentWithWrapper(additionalControls)}
      ${this.renderByCondition(
        this.showError,
        html` <div class="field-error">${error}</div>`,
      )}
    `;
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
  };

  private getConfigFromInputName(): void {
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

      this.showError = !!(fieldStatus.isTouched && !fieldStatus.isFocused);

      this.config = {
        ...this.config,
        error: this.getFirstError(fieldStatus.errors),
      };
    });
  }

  private getFirstError(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }

    const firstErrorKey: string = Object.keys(errors)[0];
    return errors[firstErrorKey]?.message ?? null;
  }

  private renderSecureComponentWithWrapper(
    additionalControls?: TemplateResult<1> | null,
  ): TemplateResult<1> {
    const additionalClass = additionalControls
      ? 'wrapper--additional-controls'
      : '';
    return html`
      <div class="wrapper ${additionalClass}">
        ${unsafeHTML(this.getSecureHtml())}
        ${this.renderByCondition(
          !!additionalControls,
          html`${additionalControls}`,
        )}
      </div>
    `;
  }
}
