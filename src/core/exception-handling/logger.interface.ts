export interface LoggerInterface {
  info(message: string, attributes: { [key: string]: unknown }): void;
  warn(message: string, attributes: { [key: string]: unknown }): void;
  error(message: string, attributes: { [key: string]: unknown }): void;
}
