interface SymbolFormat {
  grapheme: string;
  template: string;
  rtl: boolean;
}

export interface CurrencyFormat {
  name: string;
  fractionSize: number;
  symbol: SymbolFormat;
  uniqSymbol: SymbolFormat | null;
}
