export const CURRENCIES = ["CAD", "USD", "EUR"]

export interface TokenDto {
    coingeckoId: string;
    name: string;
    symbol: string;
    chainAddresses: {
        [chainId: number]: string;
    };
    decimals: number;
    logoURI: string;
}

export const TOKEN_MAP: Record<string, TokenDto> = {
    WETH: {
        coingeckoId: 'ethereum',
        name: 'Wrapped Ethereum',
        symbol: 'ETH',
        chainAddresses: {
            1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
        },
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
    },
    WBTC: {
        coingeckoId: 'bitcoin',
        name: 'Wrapped Bitcoin',
        symbol: 'wBTC',
        chainAddresses: {
            1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        },
        decimals: 8,
        logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1696507857',

    }
}

export const TOKENS = Object.values(TOKEN_MAP);

export const API_URL = "https://api.coingecko.com/api/v3"
