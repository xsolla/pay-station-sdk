export interface PaymentMethod {
  id: number;
  rank: number;
  name: string;
  aliases: string;
  categories: number[];
  isVisible: boolean;
  recommended: boolean;
  enabledSaveAccount: null | unknown[];
  iconName: string | null;
}
