export type TokenInputMode = "token" | "fiat";

export interface PriceDataDto {
  [symbol: string]: Record<string, number>;
}

export interface GetTokenDataInputs {
  chainId?: number;
  currency: string;
  symbol: string;
}
