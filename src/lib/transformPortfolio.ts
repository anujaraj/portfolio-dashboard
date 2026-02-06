import { Sector } from "@/types/portfolio";
import { UIStock } from "@/types/ui";

export function transformPortfolio(sectors: Sector[]): UIStock[] {
  const rows: UIStock[] = [];
  let totalInvestment = 0;

  sectors.forEach(sector => {
    sector.stocks.forEach(stock => {
      const qty = stock.qty ?? 0;
      const purchasePrice = stock.purchasePrice ?? 0;
      const investment = qty * purchasePrice;

      rows.push({
        sector: sector.sector ?? "N/A",
        name: stock.name ?? "N/A",
        symbol: stock.exchangeCode ?? "N/A",
        purchasePrice,
        qty,
        investment
      });

      totalInvestment += investment;
    });
  });

  rows.forEach(row => {
    row.portfolioPercent = totalInvestment > 0 ? (row.investment / totalInvestment) * 100 : 0;
  });

  return rows;
}
