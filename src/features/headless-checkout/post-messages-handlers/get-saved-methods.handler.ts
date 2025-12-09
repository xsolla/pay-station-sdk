import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { SavedMethod } from '../../../core/saved-method.interface';
import { isSavedMethodsEventMessage } from '../../../core/guards/saved-methods-event-message.guard';

export const getSavedMethodsHandler: Handler<SavedMethod[]> = (
  message: Message,
): { isHandled: boolean; value: SavedMethod[] } | null => {
  if (!isSavedMethodsEventMessage(message)) {
    return null;
  }

  const savedMethods = message.data?.methods;
  return {
    isHandled: true,
    value: savedMethods ?? [],
  };
};
