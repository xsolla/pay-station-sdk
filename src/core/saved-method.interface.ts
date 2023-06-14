export interface SavedMethod {
  currency: string;
  form: { paymentSid: string };
  id: number;
  isSelected?: boolean;
  isBabkaPay?: boolean;
  name: string;
  pid: number;
  psName: string;
  recurrentType: string;
  replaced: boolean;
  type: string;
  cardExpiryDate?: {
    month: string;
    year: string;
  };
  iconName: string | null;
  partner?: string | null;
}
