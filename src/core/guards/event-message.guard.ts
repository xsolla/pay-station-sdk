import { Message } from '../message.interface';

export const isEventMessage = (messageData: unknown): messageData is Message =>
  !!(messageData as Message)?.name;
