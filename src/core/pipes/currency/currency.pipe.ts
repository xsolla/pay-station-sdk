import currencyFormat from 'currency-format/currency-format.json';
import { singleton } from 'tsyringe';
import { DecimalPipe } from '../decimal/decimal.pipe';
import { PipeTransform } from '../pipe-transform.interface';
import { CurrencyFormat } from './currency-format.interface';

@singleton()
export class CurrencyPipe implements PipeTransform {
  public constructor(private readonly decimalPipe: DecimalPipe) {}

  public transform(
    value: number | string | null,
    currencyCode?: string,
  ): string | null {
    if (!value?.toString() || !currencyCode) {
      return null;
    }

    return this.formatCurrency(value, currencyCode);
  }

  private getCurrencyConfig(currencyCode: string): CurrencyFormat | null {
    // @ts-expect-error json don't have string type index
    const formatForCurrency = currencyFormat[
      currencyCode.toUpperCase()
    ] as unknown as CurrencyFormat | undefined;

    if (!formatForCurrency) {
      return null;
    }

    return formatForCurrency;
  }

  private formatCurrency(
    value: number | string,
    currencyCode: string,
  ): string | null {
    const currencyConfig = this.getCurrencyConfig(currencyCode);

    if (!currencyConfig?.uniqSymbol) {
      return this.formatCurrencyWithNoConfig(value, currencyCode);
    }

    const amount = this.decimalPipe.transform(
      value,
      1,
      currencyConfig.fractionSize,
      currencyConfig.fractionSize,
    );

    if (!amount) {
      return null;
    }

    const formattedCurrency = currencyConfig.uniqSymbol.template
      .replace('1', amount)
      .replace('$', currencyConfig.uniqSymbol.grapheme);

    return formattedCurrency;
  }

  private formatCurrencyWithNoConfig(
    value: number | string,
    currencyCode: string,
  ): string | null {
    const amount = this.decimalPipe.transform(value, 1, 2, 2);

    if (!amount) {
      return null;
    }

    return `${amount} ${currencyCode}`;
  }
}
