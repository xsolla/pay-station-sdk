import { Handler } from '../../../core/post-messages-client/handler.type';
import { ControlComponentConfig } from './control-component-config.interface';
import { Message } from '../../../core/message.interface';
import { isControlConfigEventMessage } from '../../../core/guards/control-config-event-message.guard';
import { CheckboxComponentConfig } from './checkbox/checkbox-component-config.interface';
import { TextComponentConfig } from './text-component/text-component.config.interface';

type ControlComponentConfigType =
  | ControlComponentConfig
  | CheckboxComponentConfig
  | TextComponentConfig;

export const getControlComponentConfigHandler: Handler<
  ControlComponentConfigType
> = (
  message: Message,
  callback?: (args?: unknown) => boolean | void,
): {
  isHandled: boolean;
  value: ControlComponentConfigType;
} | null => {
  if (isControlConfigEventMessage<ControlComponentConfigType>(message)) {
    const config = message.data?.config;

    if (typeof callback !== 'function' || !callback(config?.name)) {
      return null;
    }

    return {
      isHandled: true,
      value: config!,
    };
  }

  return null;
};
