import { useCallback } from "react";
import type { GetTokenDataInputs, TokenInputMode } from "./token.dto";
import { useTokenData } from "./useTokenData";

export interface UseTokenPriceConversionInputs extends GetTokenDataInputs {
  inputMode: TokenInputMode;
}

const d2 = Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const d8 = Intl.NumberFormat(undefined, { maximumFractionDigits: 8 });

export const useTokenPriceConversion = (inputs: GetTokenDataInputs) => {
  const tokenResponse = useTokenData(inputs);
  const { data: tokenData } = tokenResponse;

  const convert = useCallback(
    (args: { inputMode: TokenInputMode; amount: number }) => {
      console.debug("Converting...", { args, tokenData });
      if (!tokenData) return 0;

      const { inputMode, amount } = args;

      if (inputMode === "token") {
        return amount * tokenData.price;
      }

      return amount / tokenData.price;
    },
    [tokenData],
  );

  const formatAmount = useCallback(
    (args: { inputMode: TokenInputMode; amount: number }) => {
      // TODO: format based on token decimals
      return args.inputMode === "token"
        ? d2.format(args.amount)
        : d8.format(args.amount);
    },
    [],
  );

  return {
    ...tokenResponse,
    convert,
    formatAmount,
  };
};
