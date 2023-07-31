import { Handler } from '../../../../core/post-messages-client/handler.type';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';

//не имеет сути, сделано в качестве примера
export const submitButtonHandler: Handler<void> = (
  message: Message
): { isHandled: boolean } | null => {
  if (message.name === EventName.submitForm) {
    return {
      isHandled: true,
    };
  }
  return null;
};
