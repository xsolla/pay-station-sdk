export interface Action<T = string, D = object> {
  type: T;
  data: D;
}
