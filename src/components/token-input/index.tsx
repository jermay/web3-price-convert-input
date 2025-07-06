import { type ComponentProps, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { TokenInputMode } from "./token.dto";
import { useTokenPriceConversion } from "./useTokenPriceConversion";
import { TokenIcon } from "./tokenIcon";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [inputMode, setInputMode] = useState<TokenInputMode>("fiat");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [fiatAmount, setFiatAmount] = useState(0);
  const [currency] = useState(defaultCurrency);

  const { convert, error, formatAmount } = useTokenPriceConversion({
    symbol,
    currency,
  });

  const displayValues = useMemo(() => {
    return inputMode === "token"
      ? {
          input: tokenAmount,
          output: fiatAmount,
          symbolIn: symbol,
          symbolOut: currency,
        }
      : {
          input: fiatAmount,
          output: tokenAmount,
          symbolIn: currency,
          symbolOut: symbol,
        };
  }, [inputMode, tokenAmount, fiatAmount, currency, symbol]);

  const handleConvert = () => {
    console.debug("handleConvert", { inputMode });

    if (error) {
      // reset query cache if there is an error
      void queryClient.invalidateQueries({
        queryKey: ["tokenData", symbol, currency],
      });
    }

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

  const toggleMode = () => {
    const newMode = inputMode === "token" ? "fiat" : "token";
    setInputMode(newMode);
  };

  return (
    <div className="flex flex-col sm:items-center gap-2 sm:flex-row">
      <div className="flex items-center gap-2">
        <Input
          {...props}
          placeholder="Enter amount"
          value={displayValues.input}
          type="number"
          onChange={(e) => handleInputChange(Number(e.target.value))}
        />
        <TokenIcon symbol={displayValues.symbolIn} />
      </div>

      <Button onClick={handleConvert}>
        {`Convert to ${displayValues.symbolOut}`}
      </Button>
      <Button onClick={toggleMode}>Switch Currencies</Button>

      {displayValues.output > 0 && (
        <span className="text-center">{`Amount of ${displayValues.symbolOut}: ${formatAmount({ inputMode, amount: displayValues.output })}`}</span>
      )}

      {error && (
        <span className="text-center text-destructive">{error.message}</span>
      )}
    </div>
  );
};
