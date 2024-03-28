import { StatusFinanceInfo } from './status-finance-info.interface';
import { StatusEnum } from './status.enum';
import { TitleClass } from './title-class.enum';

export interface Status {
  statusState: StatusEnum;
  statusMessage: string;
  group: string;
  postMessageStatus?: string;
  virtualCurrencyAmount?: number;
  email?: string;
  financeInfo?: StatusFinanceInfo;
  isCancelUser?: boolean;
  backUrlSettings?: {
    backUrl: string;
    backUrlAction?: string;
    backUrlCaption: string;
    returnRegion: string;
    showBackButton?: boolean;
  };
  additionalBackButton?: {
    link: string;
    action: string;
    label: string;
    region: string;
    isEnabled: boolean;
  };
  needToCheck?: boolean;
  autoRedirect?: { time: number };
  userReturnStatus?: string;
  discount?: number | null;
  userId?: string;
  invoice?: number;
  pid?: number;
  projectAmount?: {
    amount: string;
    currency: string;
  };
  titleClass?: TitleClass;
  isSuccess?: boolean;
  isCanceled?: boolean;
  paymentCountryIso?: string;
  order?: {
    lineitems?: Array<{
      name: string;
      quantity: number;
      currency: string;
      amount: number;
      amount_without_discount: number;
      indirect_tax_rate: number;
    }>;
    shipping?: {
      currency: string;
      amount: number;
    };
    contained_taxes?: {
      sales_tax?: boolean;
      user_vat?: boolean;
    };
  };
  isSavePaymentAccount?: boolean;
  autoCancellation: boolean;
}
