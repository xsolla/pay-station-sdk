export interface ValidationErrors {
  [key: string]: {
    [key: string]: unknown;
    message?: string;
  };
}
