import { CartLine } from './cart-line.interface';
import { Price } from './price.interface';

export interface CartItem {
  key?: string;
  imgSrc?: string;
  hasDefaultImg?: boolean;
  title: string;
  price: Price;
  priceBeforeDiscount?: Price;
  description?: string | null;
  tax?: CartLine | null;
  quantity?: number;
  isBonus: boolean;
}
