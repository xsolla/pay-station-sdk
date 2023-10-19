import { container } from 'tsyringe';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { ElementEventName } from './element-events.enum';
import {
  publicControlChangeState,
  publicControlOnValueChanges,
} from './element.handlers';
import { ControlComponentConfig } from '../control-component-config.interface';
import { Message } from '../../../../core/message.interface';
import { getControlComponentConfigHandler } from '../get-control-component-config.handler';
import { CheckboxComponentConfig } from '../checkbox/checkbox-component-config.interface';

export abstract class BaseControl extends WebComponentAbstract {
  protected postMessagesClient: PostMessagesClient;

  protected controlName!: string;

  protected constructor() {
    super();

    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected async getComponentConfig(
    inputName: string
  ): Promise<ControlComponentConfig | CheckboxComponentConfig> {
    const msg: Message<{ inputName: string }> = {
      name: EventName.getControlComponentConfig,
      data: {
        inputName,
      },
    };

    return this.postMessagesClient.send<
      ControlComponentConfig | CheckboxComponentConfig
    >(msg, (message) => {
      return getControlComponentConfigHandler(message, (controlName) => {
        return msg.data?.inputName === controlName;
      });
    }) as Promise<ControlComponentConfig>;
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
      publicControlOnValueChanges
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
      publicControlChangeState
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
      publicControlChangeState
    );
  }
}
