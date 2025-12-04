import { Price } from '../../../../core/finance-details/price.interface';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';

export const getPriceTextTemplate = (
  cartLine?: CartLine | null,
  price?: Price | null,
  className?: string,
): string => {
  const priceLineContent = cartLine?.content ?? '';
  const priceLineAmount = cartLine?.money?.amount ?? '';
  const priceLineCurrency = cartLine?.money?.currency ?? '';
  const amount = price?.amount ?? '';
  const currency = price?.currency ?? '';

  return `
    <psdk-price-text
      class="${className ?? ''}"
      price-line-content="${priceLineContent}"
      price-line-amount="${priceLineAmount}"
      price-line-currency="${priceLineCurrency}"
      amount="${amount}"
      currency="${currency}"
    ></psdk-price-text>
  `;
};
