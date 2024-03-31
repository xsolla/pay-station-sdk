import { Message } from '../../core/message.interface';
import { isEventMessage } from './event-message.guard';
import { EventName } from '../../core/event-name.enum';
import { CountryResponse } from '../country-response.interface';

export const isCountryListEventMessage = (
  messageData: unknown,
): messageData is Message<{
  countryList: CountryResponse['countryList'];
  currentCountry: string;
}> => {
  if (isEventMessage(messageData)) {
    return (
      messageData.name === EventName.getCountryList &&
      (messageData.data as { [key: string]: unknown })?.countryList !==
        undefined
    );
  }
  return false;
};
