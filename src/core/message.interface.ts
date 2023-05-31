import { EventName } from './event-name.enum';

export interface Message<T = unknown> {
  name: EventName;
  data?: T;
}
