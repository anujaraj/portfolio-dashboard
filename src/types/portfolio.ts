export type Stock = {
  name: string;
  purchasePrice: number;
  qty: number;
  exchangeCode: string;
};

export type Sector = {
  sector: string;
  stocks: Stock[];
};
