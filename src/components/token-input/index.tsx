import { type ComponentProps, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTokenData } from "./useTokenData";
import type { TokenInputMode } from "./token.dto";
import { useTokenPriceConversion } from "./useTokenPriceConversion";

export interface TokenInputProps extends ComponentProps<"input"> {
  symbol: string;
  defaultCurrency?: string;
}

export const TokenInput = ({
  defaultCurrency = "USD",
  symbol,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type, // ignore iput type from props as should always be number
  ...props
}: TokenInputProps) => {
  const [inputMode, setInputMode] = useState<TokenInputMode>("fiat");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [fiatAmount, setFiatAmount] = useState(0);
  const [currency, setCurrency] = useState(defaultCurrency);

  const { convert, formatAmount } = useTokenPriceConversion({
    symbol,
    currency,
  });

  const displayAmounts = useMemo(() => {
    return inputMode === "token"
      ? { input: tokenAmount, output: fiatAmount, symbol: currency }
      : { input: fiatAmount, output: tokenAmount, symbol: symbol };
  }, [inputMode, tokenAmount, fiatAmount, currency, symbol]);

  const handleConvert = () => {
    console.debug("handleConvert", { inputMode });

    if (inputMode === "token") {
      const convertedAmount = convert({ inputMode, amount: tokenAmount });
      setFiatAmount(convertedAmount);
      return;
    }

    const convertedAmount = convert({ inputMode, amount: fiatAmount });
    setTokenAmount(convertedAmount);
  };

  const handleInputChange = (amount: number) => {
    if (inputMode === "token") {
      setTokenAmount(amount);
      return;
    }

    setFiatAmount(amount);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        {...props}
        type="number"
        onChange={(e) => handleInputChange(Number(e.target.value))}
      />
      <Button onClick={handleConvert}>{`Convert to ${symbol}`}</Button>
      {displayAmounts.output > 0 && (
        <span>{`Amount of ${displayAmounts.symbol}: ${formatAmount({ inputMode, amount: displayAmounts.output })}`}</span>
      )}
    </div>
  );
};
