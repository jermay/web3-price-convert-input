# Web3 Price Convert Input

Demonstrates a simple price conversion input using the Coingecko API.

![component screenshot](image.png)

## Features

- Fetches token prices from Coingecko API
- Converts between tokens and fiat currencies
- Supported tokens: WETH, WBTC

### Possbile future features

- Refactor to use Storybook
- Add more tokens. Can get token addresses from the Uniswap lists, would just need to map them to the Coingecko IDs for price data
- Add a selector for the currency. Coingecko API can return prices in multiple currencies, but only one is used in the demo.
- Wallet connection
  - The demo doesn't need to connect to a wallet, but this component could be used to display the user's wallet balance and equivalent fiat balance
  - Could use RainbowKit or Reown AppKit to connect to a wallet, these packages provide a pre-built UI for connecting to different wallets and hooks for switching networks
- Swap functionality
  - This component could be used to swap tokens for fiat, or to swap fiat for tokens instead of just displaying the conversion
  - In this case, the wallet connection and currently connected network would need to be managed to match the UI. Wagmi and Reown AppKit provide hooks for this, but support is limted to EVM chains.
  - Cross chain swaps between EVM and non-EVM chains would require chain abstraction at both the protocol and UI levels and would be a more complex implementation. Could use Tanstack Query to create a Wagmi-like inerface for non EVM chains.


## Tech Stack

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCn UI](https://ui.shadcn.com/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Wagmi](https://wagmi.sh/)
- [Coingecko API](https://www.coingecko.com/en/api/documentation)

## Getting Started

1. Clone the repository
2. Install dependencies `npm install`
3. Create a `.env` file based on the `.env.example` file
   - Get your Coingecko API key from [Coingecko](https://docs.coingecko.com/v3.0.1/reference/setting-up-your-api-key)
4. Start the development server `npm run dev`

