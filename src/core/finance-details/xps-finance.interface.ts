export interface XpsFinance {
  payment_country: { iso: string };
  sub_total: {
    amount: number;
    currency: string;
    payment_amount: number;
    payment_currency: string;
  };
  discount: { amount: number; currency: string };
  vat_user?: {
    amount: number;
    percent: number;
    currency: string;
    visible: boolean;
  };
  sales_tax: { amount: number; percent: number; currency: string };
  sales_tax_user?: { amount: number; percent: number; currency: string };
  fee: { amount: number; currency: string };
  total: { amount: number; currency: string };
  xsolla_credits?: {
    payment_amount: number;
    payment_currency: string;
  };
  vat: {
    amount: number;
    percent: number;
    currency: string;
    visible: boolean;
  };
  user_balance?: { amount: number; currency: string };
  grand_total?: { amount: number; currency: string };
}
