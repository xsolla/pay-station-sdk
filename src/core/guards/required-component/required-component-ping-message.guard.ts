import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { isEventMessage } from '../event-message.guard';

interface RequiredComponentPingData {
  componentName: string;
}

export const isRequiredComponentPingMessage = (
  message: unknown,
): message is Message<RequiredComponentPingData> => {
  if (isEventMessage(message)) {
    return message.name === EventName.requiredComponentPing;
  }

  return false;
};
