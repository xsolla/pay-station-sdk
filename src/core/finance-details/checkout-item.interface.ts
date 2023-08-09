export interface CheckoutItem {
  quantity: number;
  amount: number | null;
  amount_before_discount?: number | null;
  name: string;
  image_url: string;
  description: string | null;
  currency: string;
  is_bonus: boolean;
  indirect_tax_rate: number;
}
