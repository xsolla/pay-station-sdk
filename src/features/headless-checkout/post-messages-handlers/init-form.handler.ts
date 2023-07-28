import { Form } from '../../../core/form/form.interface';
import { isInitFormEventMessage } from '../../../core/guards/init-form-event-message.guard';
import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';

export const initFormHandler: Handler<Form> = (
  message: Message
): { isHandled: boolean; value?: Form } | null => {
  if (isInitFormEventMessage(message)) {
    return {
      isHandled: true,
      value: message.data,
    };
  }
  return null;
};
