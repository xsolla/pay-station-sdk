export interface VirtualCurrency {
  quantity: number;
  amount: number | null;
  name: string;
  image_url: string;
  description: string;
  longDescription: string | null;
  is_bonus: boolean;
  currency: string;
}
