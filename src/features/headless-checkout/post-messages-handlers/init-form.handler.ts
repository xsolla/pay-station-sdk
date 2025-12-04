import { Form } from '../../../core/form/form.interface';
import { isInitFormEventMessage } from '../../../core/guards/init-form-event-message.guard';
import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';

export const initFormHandler: Handler<Form> = (
  message: Message,
  callback?: (args?: unknown) => void,
): { isHandled: boolean; value?: Form } | null => {
  if (isInitFormEventMessage(message)) {
    if (typeof callback === 'function') {
      callback(message.data);
    }
    return {
      isHandled: true,
      value: message.data,
    };
  }
  return null;
};
