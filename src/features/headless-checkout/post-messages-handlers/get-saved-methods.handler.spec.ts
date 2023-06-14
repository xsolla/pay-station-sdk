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
  iconName: 'mastercard.svg',
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
      getSavedMethodsHandler({ name: EventName.getUserBalance })
    ).toBeNull();
  });
});
