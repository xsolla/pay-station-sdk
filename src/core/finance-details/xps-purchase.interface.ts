import { CheckoutItem } from './checkout-item.interface';
import { VirtualCurrency } from './virtual-currency.interface';

export interface XpsPurchase {
  virtual_currency?: VirtualCurrency[];
  checkout_items?: CheckoutItem[];
  virtual_items?: VirtualCurrency[];
  checkout?: {
    amount: number;
    currency: string;
    description: string;
    is_bonus?: boolean;
  };
}
