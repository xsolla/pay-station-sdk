import { CommonLogAttributes } from '../common-log-attributes/common-log-attributes.interface';

export interface LogMessage {
  additionalInfo: CommonLogAttributes;
  message: string;
  extra?: object;
}
