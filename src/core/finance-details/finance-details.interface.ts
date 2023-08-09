import { CartItem } from './cart-item.interface';
import { CartSummary } from './cart-summary.interface';
import { XpsFinance } from './xps-finance.interface';
import { XpsPurchase } from './xps-purchase.interface';

export interface FinanceDetails {
  purchase: XpsPurchase;
  finance: XpsFinance;
  cartItems: CartItem[];
  cartSummary: CartSummary;
  paymentCountry: string;
}
