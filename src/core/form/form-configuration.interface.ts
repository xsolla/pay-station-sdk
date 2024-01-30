export interface FormConfiguration {
  paymentMethodId: number;
  returnUrl: string;
  country?: string;
  paymentWithSavedMethod?: boolean;
  savedMethodId?: number;
}
