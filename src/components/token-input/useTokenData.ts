import { useQuery } from "@tanstack/react-query";
import type { GetTokenDataInputs } from "./token.dto";

export const useTokenData = ({ symbol, currency }: GetTokenDataInputs) => {
  return useQuery({
    queryKey: ["tokenData", symbol, currency],
    queryFn: async () => {
      const tokenData = {
        symbol,
        name: "Wrapped Bitcoin",
        price: {
          USD: 110_000,
        },
        logoUrl:
          "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857",
      };

      return tokenData;
    },
    select: (data) => {
        const priceData = data.price as Record<string, number>; 
        return {
            ...data,
            currency,
            price: priceData[currency],
        }
    },
  });
};
