export interface PaymentMethod {
  id: number;
  rank: number;
  name: string;
  aliases: string;
  categories: number[];
  recommended: boolean;
  enabledSaveAccount: null | unknown[];
  iconName: string | null;
}
