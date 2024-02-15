import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../event-name.enum';

export const isSubmitButtonLoadingMessage = (
  messageData: unknown,
): messageData is Message<{ formStatus: string }> =>
  isEventMessage(messageData) && messageData.name === EventName.getFormStatus;
