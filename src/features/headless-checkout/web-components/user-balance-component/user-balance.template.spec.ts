import { getUserBalanceTemplate } from './user-balance.template';
import { Balance } from '../../../../core/balance.interface';

const mockBalance: Balance = {
  amount: 10,
  currency: 'USD',
};

const emptyBalance = 'No balance';

describe('getUserBalanceTemplate', () => {
  it('Should contains user-balance', () => {
    expect(getUserBalanceTemplate(mockBalance, '')).toContain('user-balance');
  });

  it('Should contains no-balance string', () => {
    expect(getUserBalanceTemplate(null, emptyBalance)).toContain(emptyBalance);
  });
});
