export type LegalArea = 'US' | 'EU' | 'KR' | 'other';

export interface LegalComponentConfig {
  legalArea?: LegalArea;
  isJapanUser: boolean;
  refundPolicyUrl: string;
  sctlPolicyUrl?: string;
  disclaimer?: string;
}
