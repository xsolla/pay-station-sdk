import { StatusEnum } from '../../../../../core/status/status.enum';

export interface StatusComponentConfig {
  title: string;
  image: string | null;
  description: string;
  showDescription: boolean;
  isSavePaymentAccount?: boolean;
  status: StatusEnum;
  autoCancellation: boolean;
}
