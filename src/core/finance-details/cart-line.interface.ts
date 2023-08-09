import { Price } from './price.interface';

export interface CartLine {
  key?: string;
  title?: string;
  content?: string;
  money?: Price;
  rate?: number;
  isDateLine?: boolean;
}
