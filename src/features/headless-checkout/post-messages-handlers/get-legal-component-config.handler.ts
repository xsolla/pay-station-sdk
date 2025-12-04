import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { EventName } from '../../../core/event-name.enum';
import { LegalComponentConfig } from '../web-components/legal/legal-component.config.interface';
import { isLegalConfigEventMessage } from '../../../core/guards/legal-config-event-message.guard';

export const getLegalComponentConfigHandler: Handler<LegalComponentConfig> = (
  message: Message,
): { isHandled: boolean; value: LegalComponentConfig } | null => {
  if (
    isLegalConfigEventMessage(message) &&
    message.name === EventName.getLegalComponentConfig
  ) {
    const config = message.data?.config;
    return {
      isHandled: true,
      value: config!,
    };
  }
  return null;
};
