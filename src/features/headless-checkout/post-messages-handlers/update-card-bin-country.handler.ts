import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';
import { isUpdateCardBinCountryMessage } from '../../../core/guards/update-card-bin-country.guard';

export const updateCardBinCountryHandler: Handler<{
  cardBinCountry?: string;
}> = (
  message: Message,
): { isHandled: boolean; value?: { cardBinCountry?: string } } | null => {
  if (isUpdateCardBinCountryMessage(message)) {
    return {
      isHandled: true,
      value: message.data,
    };
  }

  return null;
};
