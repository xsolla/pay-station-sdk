import { EventName } from '../../core/event-name.enum';
import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';

export const isFormMessagesEventMessage = (
  messageData: unknown,
): messageData is Message<string[]> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.formMessagesChanged;
  }

  return false;
};
