import { UIStock } from "@/types/ui";
import { getMarketData } from "./marketData";

export async function enrichPortfolio(stocks: UIStock[]) {
  return Promise.all(
    stocks.map(async stock => {
      const symbol = stock.symbol ?? "N/A";
      const qty = stock.qty ?? 0;
      const investment = stock.investment ?? 0;

      let market;
      try {
        market = await getMarketData(symbol);
      } catch (e) {
        market = { cmp: 0, pe: 0, earnings: 0 };
      }

      const presentValue = (market?.cmp ?? 0) * qty;
      const gainLoss = presentValue - investment;

      return {
        ...stock,
        cmp: market?.cmp ?? 0,
        peRatio: market?.pe ?? 0,
        earnings: market?.earnings ?? 0,
        presentValue,
        gainLoss
      };
    })
  );
}
