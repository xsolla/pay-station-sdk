import { PaymentMethod } from './payment-method.interface';
import { SavedMethod } from './saved-method.interface';

export interface CombinedPaymentMethods {
  paymentMethods: {
    quick: PaymentMethod[];
    remained: PaymentMethod[];
  };
  savedMethods: SavedMethod[];
}
