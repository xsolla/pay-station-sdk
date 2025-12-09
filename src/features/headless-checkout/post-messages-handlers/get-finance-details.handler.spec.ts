import { EventName } from '../../../core/event-name.enum';
import { FinanceDetails } from '../../../core/finance-details/finance-details.interface';
import { Message } from '../../../core/message.interface';
import { getFinanceDetailsHandler } from './get-finance-details.handler';

const financeDetails = {} as unknown as FinanceDetails;

const mockMessage: Message<FinanceDetails> = {
  name: EventName.financeDetails,
  data: financeDetails,
};

describe('getFinanceDetailsHandler', () => {
  it('Should handle financeDetails event', () => {
    expect(getFinanceDetailsHandler(mockMessage)).toEqual({
      isHandled: true,
      value: financeDetails,
    });
  });

  it('Should not handle not financeDetails event', () => {
    expect(
      getFinanceDetailsHandler({ name: EventName.initPayment }),
    ).toBeNull();
  });
});
