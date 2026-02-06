import { UIStock } from "@/types/ui";
import { getMarketData } from "./marketData";

export async function enrichPortfolio(stocks: UIStock[]) {
  return Promise.all(
    stocks.map(async stock => {
      const market = await getMarketData(stock.symbol ?? "DEFAULT_SYMBOL");


      const presentValue = market.cmp * stock.qty;
      const gainLoss = presentValue - stock.investment;

      return {
        ...stock,
        cmp: market.cmp,
        peRatio: market.pe,
        earnings: market.earnings,
        presentValue,
        gainLoss
      };
    })
  );
}
