import { EventName } from '../event-name.enum';
import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';

export const isDeleteSavedMethodMessage = (
  messageData: unknown,
): messageData is Message<{ isDeleteSuccessful: boolean }> =>
  isEventMessage(messageData) &&
  messageData.name === EventName.deleteSavedMethod;
