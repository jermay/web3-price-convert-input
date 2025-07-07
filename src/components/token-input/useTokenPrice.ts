import { useQuery } from "@tanstack/react-query";
import type { GetTokenDataInputs, PriceDataDto } from "./token.dto";
import { API_URL, TOKEN_MAP } from "./data";
import { useTokenData } from "./useTokenData";

export const useTokenPrice = ({ symbol, currency }: GetTokenDataInputs) => {
     const { data: tokenData } = useTokenData({ symbol });

  return useQuery({
    queryKey: ["token-price", symbol, currency],
    queryFn: async () => {
      console.debug("Fetching token data", { symbol, currency });
      const token = TOKEN_MAP[symbol.toUpperCase()];
      if (!token) {
        console.error(`No static token found for ${symbol}`);
        return 0;
      }

      try {
        // fetch price data from Coingecko
        const response = await fetch(
          `${API_URL}/simple/price?ids=${token.coingeckoId.toLowerCase()}&vs_currencies=${currency.toLowerCase()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
            },
          },
        );

        const data: PriceDataDto = await response.json();

        // use static data for testing to avoid API call
        // const data: PriceDataDto = {
        //   bitcoin: {
        //     usd: 108771,
        //     cad: 148065,
        //     eur: 92346,
        //   },
        // };
        console.debug("Fetched token data", { data });

        const price: number | undefined = data?.[token.coingeckoId]?.[currency.toLowerCase()];

        return {
          ...token,
          price,
        };
      } catch (error) {
        console.error("Error fetching token data", { error });
        throw new Error("Error getting price data");
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: !!symbol && !!currency && !!tokenData,
    retry: false,
  });
};
