export function parseMessageData<T>(data: unknown): T {
  return (typeof data === 'string' ? JSON.parse(data) : data) as T;
}
