export interface SendCashPaymentDataStatus {
  status: 'succeed' | 'failed';
  type: 'sms' | 'email';
  errors: string[];
}
