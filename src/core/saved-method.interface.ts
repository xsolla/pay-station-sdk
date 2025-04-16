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
  dateCreate: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  dateLastCharge: number;
  iconName: string | null;
  userEmail: string | null;
  partner?: string | null;
}
