import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { TextComponentConfig } from '../../features/headless-checkout/web-components/text-component/text.component.config.interface';

export const isTextConfigEventMessage = (
  messageData: unknown
): messageData is Message<{ config: TextComponentConfig }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getControlComponentConfig &&
      (messageData.data as { [key: string]: unknown })?.config !== undefined
    );
  }
  return false;
};
