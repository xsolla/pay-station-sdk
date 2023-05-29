import { Message } from '../../../../core/post-messages-client/message.interface';
import { EventName } from '../../../../core/post-messages-client/event-name.enum';
import { Handler } from '../../../../core/post-messages-client/handler.type';

//не имеет сути, сделано в качестве примера
export const submitButtonHandler: Handler<void> = (
  message: Message
): { isHandled: boolean } | null => {
  if (message.name === EventName.submitButton) {
    return {
      isHandled: true
    };
  }
  return null;
};
