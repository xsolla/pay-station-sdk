import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { ValidationErrors } from '../../../../core/form/validation-error/validation-errors.interface';
import { HeadlessCheckout } from '../../headless-checkout';
import { ControlComponentConfig } from '../control-component-config.interface';
import { getControlComponentConfigHandler } from '../get-control-component-config.handler';
import {
  publicControlChangeState,
  publicControlOnValueChanges,
} from './element.handlers';
import { ElementEventName } from './element-events.enum';
import { ValidationErrorService } from '../../../../core/form/validation-error/validation-error.service';

export abstract class BaseControl<
  Config extends ControlComponentConfig,
> extends WebComponentAbstract {
  protected postMessagesClient: PostMessagesClient;
  protected headlessCheckout: HeadlessCheckout;
  protected validationErrorService: ValidationErrorService;
  protected window: Window;

  protected controlName!: string;
  protected config: Config | null = null;
  protected isListeningFieldStatusChange = false;

  protected constructor() {
    super();

    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.validationErrorService = container.resolve(ValidationErrorService);
    this.window = container.resolve(Window);
  }

  protected async getComponentConfig(
    inputName: string,
  ): Promise<ControlComponentConfig> {
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
    ) as Promise<ControlComponentConfig>;
  }

  protected notifyOnValueChanges(value: unknown): void {
    void this.postMessagesClient.send(
      {
        name: EventName.publicControlOnValueChanges,
        data: {
          fieldName: this.controlName,
          value,
        },
      },
      publicControlOnValueChanges,
    );
  }

  protected notifyOnFocusEvent(): void {
    void this.postMessagesClient.send(
      {
        name: EventName.publicControlChangeState,
        data: {
          fieldName: this.controlName,
          event: ElementEventName.focus,
        },
      },
      publicControlChangeState,
    );
  }

  protected notifyOnBlurEvent(): void {
    void this.postMessagesClient.send(
      {
        name: EventName.publicControlChangeState,
        data: {
          fieldName: this.controlName,
          event: ElementEventName.blur,
        },
      },
      publicControlChangeState,
    );
  }

  protected listenFieldStatusChange(): void {
    if (this.isListeningFieldStatusChange) {
      return;
    }

    this.isListeningFieldStatusChange = true;
    this.headlessCheckout.form.onFieldsStatusChange((fieldsStatus) => {
      const fieldStatus = fieldsStatus[this.controlName];

      if (!this.config || !fieldStatus) {
        return;
      }

      this.config.error = this.validationErrorService.getMessage(
        fieldStatus.errors,
      );

      this.updateError(fieldStatus.isFocused);
    });
  }

  protected getErrorFromFieldStatus(
    errors: ValidationErrors | null,
  ): string | null {
    if (!errors) {
      return null;
    }

    const firstErrorKey: string = Object.keys(errors)[0];
    return errors[firstErrorKey]?.message ?? null;
  }

  protected updateError(isFieldInFocus: boolean | undefined): void {
    const rootElement = this.shadowRoot ?? this;
    const errorElement = rootElement.querySelector('.field-error');

    if (this.config?.error && !isFieldInFocus) {
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
