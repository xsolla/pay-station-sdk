import { Handler } from '../../../core/post-messages-client/handler.type';
import { ControlComponentConfig } from './control-component-config.interface';
import { Message } from '../../../core/message.interface';
import { isControlConfigEventMessage } from '../../../core/guards/control-config-event-message.guard';

export const getControlComponentConfigHandler: Handler<
  ControlComponentConfig
> = (
  message: Message,
  callback?: (args?: unknown) => boolean | void,
): { isHandled: boolean; value: ControlComponentConfig } | null => {
  if (isControlConfigEventMessage(message)) {
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
