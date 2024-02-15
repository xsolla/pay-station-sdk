import { CurrencyPipe } from '../../../../../core/pipes/currency/currency.pipe';
import { Price } from '../../../../../core/finance-details/price.interface';
import { container } from 'tsyringe';

export const getPriceTextTemplate = (
  content: string | null,
  priceLine: Price | null,
  price: Price | null,
): string => {
  const lines = [];
  const currencyPipe = container.resolve(CurrencyPipe);

  if (content) {
    lines.push(`<div class='content'>${content}</div>`);
  }

  if (priceLine) {
    lines.push(
      `<div class='price'>${
        currencyPipe.transform(priceLine.amount, priceLine.currency) ?? ''
      }</div>`,
    );
  }

  if (price) {
    lines.push(
      `<div class='price'>${
        currencyPipe.transform(price.amount, price.currency) ?? ''
      }</div>`,
    );
  }

  return lines.join('');
};
