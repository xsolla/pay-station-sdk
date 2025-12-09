import { Message } from '../message.interface';
import { Status } from '../status/status.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../event-name.enum';

export const isGetPaymentStatusMessage = (
  messageData: unknown,
): messageData is Message<Status> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.getPaymentStatus;
  }

  return false;
};
