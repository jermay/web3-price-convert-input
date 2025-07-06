import * as React from "react";
import { Input } from "../ui/input";

function TokenInput(props: React.ComponentProps<"input">) {
  return <Input {...props} />;
}

export { TokenInput };
