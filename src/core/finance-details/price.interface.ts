export interface Price {
  amount: number | null;
  currency: string;
  payment_amount?: number;
  payment_currency?: string;
}
