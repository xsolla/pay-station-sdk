export interface LegalComponentConfig {
  isJapanUser: boolean;
  refundPolicyUrl: string;
  sctlPolicyUrl?: string;
  secureConnection: {
    secureConnectionUrl?: string;
    isWhiteLabel?: boolean;
  };
  disclaimer?: string;
}
