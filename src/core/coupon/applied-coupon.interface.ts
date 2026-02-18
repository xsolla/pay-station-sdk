import { Price } from '../finance-details/price.interface';

export interface AppliedCoupon {
  code: string;
  discount: Price | null;
  subTotal: Price | null;
  isValid: boolean;
  errorMessage?: string;
}
