import { EventName } from '../../core/event-name.enum';
import { Message } from '../../core/message.interface';
import { Form } from '../form/form.interface';
import { isEventMessage } from './event-message.guard';

export const isInitFormEventMessage = (
  messageData: unknown,
): messageData is Message<Form> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.initForm;
  }

  return false;
};
