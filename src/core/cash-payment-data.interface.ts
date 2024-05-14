export interface CashPaymentData {
  isCashPaymentMethod: boolean;
  xsollaNumber: string;
  pid: number;
  publicId: string;
  title: string;
  projectName: string;
  printUrl: string;
  instruction?: string;
}
