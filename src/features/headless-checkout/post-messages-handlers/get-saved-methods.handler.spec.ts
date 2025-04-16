import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { getSavedMethodsHandler } from './get-saved-methods.handler';
import { SavedMethod } from '../../../core/saved-method.interface';

const mockSavedMethod: SavedMethod = {
  currency: 'RUB',
  form: {
    paymentSid: 'test',
  },
  id: 24110725,
  isSelected: true,
  name: '42761******7082',
  pid: 1380,
  psName: 'Mastercard',
  recurrentType: 'charge',
  replaced: false,
  type: 'card',
  cardExpiryDate: {
    month: '12',
    year: '2040',
  },
  dateCreate: {
    date: '2025-01-01 00:00:00.000000',
    timezone: 'Europe/Moscow',
    timezone_type: 3,
  },
  dateLastCharge: 1743576779,
  iconName: 'mastercard.svg',
  userEmail: 'amazing@user.com',
  isBabkaPay: false,
};

const mockMessage: Message<{ methods: SavedMethod[] }> = {
  name: EventName.getSavedMethods,
  data: {
    methods: [mockSavedMethod],
  },
};
describe('getSavedMethodsHandler', () => {
  it('Should handle data', () => {
    expect(getSavedMethodsHandler(mockMessage)).toEqual({
      isHandled: true,
      value: [mockSavedMethod],
    });
  });
  it('Should return null', () => {
    expect(
      getSavedMethodsHandler({ name: EventName.getUserBalance }),
    ).toBeNull();
  });
});
