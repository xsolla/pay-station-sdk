import { Handler } from '../../../core/post-messages-client/handler.type';
import { Message } from '../../../core/message.interface';
import { CountryResponse } from '../../../core/country-response.interface';
import { isCountryListEventMessage } from '../../../core/guards/country-list-event-message.guard';

export const getCountryListHandler: Handler<{
  countryList: CountryResponse['countryList'];
  currentCountry: string;
}> = (
  message: Message,
): {
  isHandled: boolean;
  value: {
    countryList: CountryResponse['countryList'];
    currentCountry: string;
  };
} | null => {
  if (!isCountryListEventMessage(message)) {
    return null;
  }

  const countryList = message.data?.countryList ?? [];
  const currentCountry = message.data?.currentCountry ?? '';

  return {
    isHandled: true,
    value: { countryList, currentCountry },
  };
};
