export interface CommonLogAttributes {
  token?: string;
  userAgent?: string;
  referrerUrl?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  isWebview?: boolean;
  theme?: string;
  topLevelDomain?: string;
  sandbox?: boolean;
  language?: string;
  isApplePayInstantFlowEnabled?: boolean;
  isGooglePayInstantFlowEnabled?: boolean | null;
  apiUrl?: string;
}
