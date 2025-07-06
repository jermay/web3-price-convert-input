import { TOKEN_MAP } from "./data";

export const TokenIcon = ({ symbol }: { symbol: string }) => {
  const token = TOKEN_MAP[symbol.toUpperCase()];
  return (
    <>
      {token ? (
        <img src={token.logoURI} alt={token.symbol} className="w-8 h-8" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-background/10 p-1">
          {symbol}
        </div>
      )}
    </>
  );
};
