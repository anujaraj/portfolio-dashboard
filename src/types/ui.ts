export type UIStock = {
  sector: string;
  name: string;
  symbol?: string;
  qty: number;
  purchasePrice: number;
  investment: number;
  portfolioPercent?: number;
  cmp?: number;
  presentValue?: number;
  gainLoss?: number;
  peRatio?: number;
  earnings?: number;
};
