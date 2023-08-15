import { CartLine } from './cart-line.interface';

export interface CartSummary {
  transactionDetails?: CartLine[];
  shipping?: CartLine[];
  subtotal?: CartLine;
  subtotalPayment?: CartLine;
  subtotalDetails?: CartLine[];
  total: CartLine;
  totalDetails?: CartLine[];
}
