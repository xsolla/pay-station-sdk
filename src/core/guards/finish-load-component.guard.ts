import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';

export const isFinishLoadComponentEventMessage = (
  messageData: unknown,
): messageData is Message<{ fieldName: string } | null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.finishLoadComponent;
  }
  return false;
};
