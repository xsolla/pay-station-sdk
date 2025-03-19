export type LegalArea = 'US' | 'EU' | 'other';

export interface LegalComponentConfig {
  legalArea?: LegalArea;
  isJapanUser: boolean;
  refundPolicyUrl: string;
  sctlPolicyUrl?: string;
  disclaimer?: string;
}
