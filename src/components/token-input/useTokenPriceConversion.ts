import { useCallback } from "react";
import type { GetTokenDataInputs, TokenInputMode } from "./token.dto";
import { useTokenPrice } from "./useTokenPrice";
import { formatUnits, parseUnits } from "viem";

export interface UseTokenPriceConversionInputs extends GetTokenDataInputs {
  inputMode: TokenInputMode;
}

export const useTokenPriceConversion = (inputs: GetTokenDataInputs) => {
  const tokenResponse = useTokenPrice(inputs);
  const { data } = tokenResponse;
  const { price, decimals } = data || {};

  const convert = useCallback(
    (args: { inputMode: TokenInputMode; amount: string }) => {
      const { inputMode, amount } = args;
      console.debug("Converting...", { args, price });

      if (!price || !decimals) throw new Error("No price data");
      if (!amount || isNaN(Number(amount))) {
        throw new Error("Invalid amount input");
      }

      // use full precision of token decimals to avoid floating-point issues
      const priceAsBigInt = parseUnits(price.toString(), decimals);

      if (inputMode === "token") {
        // amount is in tokens, convert to fiat
        const tokenAmount = parseUnits(amount, decimals);
        const fiatAmount =
          (tokenAmount * priceAsBigInt) / BigInt(10 ** decimals);
        return formatUnits(fiatAmount, decimals);
      }

      if (inputMode === "fiat") {
        // amount is in fiat, convert to tokens
        const fiatAmount = parseUnits(amount, decimals);
        const tokenAmount =
          (fiatAmount * BigInt(10 ** decimals)) / priceAsBigInt;
        return formatUnits(tokenAmount, decimals);
      }

      throw new Error(`Unsupported input mode: ${inputMode}`);
    },
    [price, decimals],
  );

  const formatAmount = useCallback(
    (args: { inputMode: TokenInputMode; amount: number }) => {
      const d = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: decimals,
      });
      return d.format(args.amount);
    },
    [decimals],
  );

  return {
    ...tokenResponse,
    convert,
    formatAmount,
  };
};
