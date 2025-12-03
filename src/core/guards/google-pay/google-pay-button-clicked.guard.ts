import { Message } from '../../message.interface';
import { isEventMessage } from '../event-message.guard';
import { EventName } from '../../event-name.enum';

export const isGooglePayButtonClickedEventMessage = (
  messageData: unknown,
): messageData is Message<null | undefined> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.googlePayButtonClicked;
  }
  return false;
};
