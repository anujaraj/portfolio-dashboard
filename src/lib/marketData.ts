type MarketData = {
  cmp: number;
  pe: number;
  earnings: number;
};

const MOCK_MARKET_DATA: Record<string, MarketData> = {
  HDFCBANK: { cmp: 1680, pe: 19.4, earnings: 82 },
  BAJFINANCE: { cmp: 7200, pe: 32.1, earnings: 108 },
  LTIM: { cmp: 6100, pe: 28.7, earnings: 142 },
  DMART: { cmp: 3900, pe: 94.3, earnings: 41 }
};

export async function getMarketData(symbol: string): Promise<MarketData> {
  await new Promise(res => setTimeout(res, 100));
  return MOCK_MARKET_DATA[symbol] ?? { cmp: 0, pe: 0, earnings: 0 };
}
