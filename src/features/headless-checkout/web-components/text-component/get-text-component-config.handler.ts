import { Handler } from '../../../../core/post-messages-client/handler.type';
import { TextComponentConfig } from './text.component.config.interface';
import { Message } from '../../../../core/message.interface';
import { isTextConfigEventMessage } from '../../../../core/guards/text-config-event-message.guard';

export const getControlComponentConfigHandler: Handler<TextComponentConfig> = (
  message: Message,
  callback?: (args?: unknown) => boolean | void
): { isHandled: boolean; value: TextComponentConfig } | null => {
  if (isTextConfigEventMessage(message)) {
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
