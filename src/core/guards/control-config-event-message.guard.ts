import { Message } from '../message.interface';
import { EventName } from '../event-name.enum';
import { isEventMessage } from './event-message.guard';

export const isControlConfigEventMessage = <T>(
  messageData: unknown,
): messageData is Message<{ config: T }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getControlComponentConfig &&
      (messageData.data as { [key: string]: unknown })?.config !== undefined
    );
  }
  return false;
};
