import { CurrencyPipe } from '../../../../core/pipes/currency/currency.pipe';
import { container } from 'tsyringe';
import { UserBalanceType } from './user-balance.type';

export const getUserBalanceTemplate = (
  balance: UserBalanceType,
  noBalanceTemplate: string,
): string => {
  const currencyPipe = container.resolve(CurrencyPipe);
  if (balance?.amount) {
    return `<div class="user-balance">${
      currencyPipe.transform(balance.amount, balance.currency) ?? ''
    }</div>`;
  }
  return noBalanceTemplate;
};
