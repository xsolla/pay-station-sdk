import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { isDeleteSavedMethodMessage } from '../../../core/guards/delete-saved-method-message.guard';

export const deleteSavedMethodHandler: Handler<boolean> = (
  message: Message,
): { isHandled: boolean; value: boolean } | null => {
  if (!isDeleteSavedMethodMessage(message)) {
    return null;
  }

  const isDeleteSuccessful = !!message.data?.isDeleteSuccessful;
  return {
    isHandled: true,
    value: isDeleteSuccessful,
  };
};
