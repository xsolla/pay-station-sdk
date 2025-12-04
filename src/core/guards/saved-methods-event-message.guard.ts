import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { SavedMethod } from '../saved-method.interface';

export const isSavedMethodsEventMessage = (
  messageData: unknown,
): messageData is Message<{ methods: SavedMethod[] }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getSavedMethods &&
      (messageData.data as { [key: string]: unknown })?.methods !== undefined
    );
  }
  return false;
};
