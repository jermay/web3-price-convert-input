import { useMemo } from "react";
import { TOKEN_MAP } from "./data";
import { useReadContracts } from "wagmi";
import { erc20Abi, type Address } from "viem";

export interface UseTokenDataInputs {
  chainId?: number;
  symbol: string;
}

export const useTokenData = ({ chainId = 1, symbol }: UseTokenDataInputs) => {
  const token = useMemo(() => TOKEN_MAP[symbol.toUpperCase()], [symbol]);

  return useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: token?.chainAddresses[chainId] as Address,
        chainId,
        functionName: "decimals",
      },
      {
        abi: erc20Abi,
        address: token?.chainAddresses[chainId] as Address,
        chainId,
        functionName: "symbol",
      },
    ],
    query: {
      staleTime: 1000 * 60 * 5, // 5 minutes,
      enabled: !!token,
      select: (data) => {
        const decimals = data[0].result;
        const symbol = data[1].result;
        console.debug("On chain token data", { decimals, symbol, data });

        return {
          ...token,
          decimals,
          symbol,
        };
      },
    },
  });
};
