import { WebComponentAbstract } from '../../../../../core/web-components/web-component.abstract';
import { PriceTextAttributes } from './price-text-attributes.enum';
import { getPriceTextTemplate } from './price-text.template';

export class PriceTextComponent extends WebComponentAbstract {
  private priceLineContent: string | null = null;
  private priceLineAmount: number | null = null;
  private priceLineCurrency: string | null = null;
  private amount: number | null = null;
  private currency: string | null = null;

  public static get observedAttributes(): string[] {
    return [
      PriceTextAttributes.priceLineContent,
      PriceTextAttributes.priceLineAmount,
      PriceTextAttributes.priceLineCurrency,
      PriceTextAttributes.amount,
      PriceTextAttributes.currency,
    ];
  }

  protected connectedCallback(): void {
    this.readAttributes();
    this.render();
  }

  protected getHtml(): string {
    const priceLine =
      this.priceLineAmount === null
        ? null
        : {
            amount: this.priceLineAmount,
            currency: this.priceLineCurrency ?? '',
          };

    const price =
      this.amount === null
        ? null
        : {
            amount: this.amount,
            currency: this.currency ?? '',
          };

    return getPriceTextTemplate(this.priceLineContent, priceLine, price);
  }

  private readAttributes(): void {
    this.priceLineContent = this.getAttribute(
      PriceTextAttributes.priceLineContent,
    );
    this.priceLineAmount = this.getNumberAttribute(
      PriceTextAttributes.priceLineAmount,
    );
    this.priceLineCurrency = this.getAttribute(
      PriceTextAttributes.priceLineCurrency,
    );
    this.amount = this.getNumberAttribute(PriceTextAttributes.amount);
    this.currency = this.getAttribute(PriceTextAttributes.currency);
  }
}
