import { EventName } from '../event-name.enum';
import { FormFieldsStatus } from '../form/form-fields-status.interface';
import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';

export const isFormFieldsStatusChangedMessage = (
  messageData: unknown,
): messageData is Message<FormFieldsStatus> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.formFieldsStatusChanged;
  }

  return false;
};
