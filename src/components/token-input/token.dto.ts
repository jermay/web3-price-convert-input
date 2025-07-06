export type TokenInputMode = "token" | "fiat";

export interface GetTokenDataInputs {
  chainId?: number;
  currency: string;
  symbol: string;
}
