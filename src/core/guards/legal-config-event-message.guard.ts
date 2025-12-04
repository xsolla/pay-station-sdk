import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { LegalComponentConfig } from '../../features/headless-checkout/web-components/legal/legal-component.config.interface';

export const isLegalConfigEventMessage = (
  messageData: unknown,
): messageData is Message<{ config: LegalComponentConfig }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getLegalComponentConfig &&
      (messageData.data as { [key: string]: unknown })?.config !== undefined
    );
  }
  return false;
};
