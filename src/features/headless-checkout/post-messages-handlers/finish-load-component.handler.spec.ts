import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { getUserBalanceValueHandler } from './get-user-balance-value.handler';
import { finishLoadComponentHandler } from './finish-load-component.handler';

const mockData = {
  fieldName: 'fieldName',
};

const mockMessage: Message<{ fieldName: string } | null | undefined> = {
  name: EventName.finishLoadComponent,
  data: {
    fieldName: 'fieldName',
  },
};

describe('finishLoadComponentHandler', () => {
  it('Should handle data', () => {
    expect(finishLoadComponentHandler(mockMessage)).toEqual({
      isHandled: true,
      value: mockData,
    });
  });
  it('Should return null', () => {
    expect(
      getUserBalanceValueHandler({ name: EventName.getSavedMethods }),
    ).toBeNull();
  });
});
