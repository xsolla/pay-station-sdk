import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';

export const isUpdateCardBinCountryMessage = (
  messageData: unknown,
): messageData is Message<{ cardBinCountry?: string }> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.sendCardBinCountry &&
      (messageData.data as { [key: string]: unknown })?.cardBinCountry !==
        undefined
    );
  }

  return false;
};
