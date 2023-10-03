import { FormFieldsStatus } from '../../../core/form/form-fields-status.interface';
import { isFormFieldsStatusChangedMessage } from '../../../core/guards/form-fields-status-changed-message.guard';
import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';

export const formFieldsStatusChangedHandler: Handler<FormFieldsStatus> = (
  message: Message,
): { isHandled: boolean; value?: FormFieldsStatus } | null => {
  if (isFormFieldsStatusChangedMessage(message)) {
    return {
      isHandled: true,
      value: message.data,
    };
  }

  return null;
};
