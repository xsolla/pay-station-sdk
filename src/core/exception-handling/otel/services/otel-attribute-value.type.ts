export type OtelAnyValue =
  | OtelStringValue
  | OtelIntValue
  | OtelDoubleValue
  | OtelBoolValue
  | OtelKvListValue;

export interface OtelStringValue {
  stringValue: string;
}
export interface OtelIntValue {
  intValue: number;
}
export interface OtelDoubleValue {
  doubleValue: number;
}
export interface OtelBoolValue {
  boolValue: boolean;
}

export interface OtelKvListValue {
  kvlistValue: {
    values: Array<{ key: string; value: OtelAnyValue }>;
  };
}
