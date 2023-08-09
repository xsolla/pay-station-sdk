export interface PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown;
}
