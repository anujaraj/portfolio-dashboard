import { Sector } from "@/types/portfolio";
import { UIStock } from "@/types/ui";

export function transformPortfolio(sectors:Sector[]):UIStock[] {
    const rows : UIStock[] = [];
    let totalInvestment=0;
    
    sectors.forEach((sector)=>{
        sector.stocks.forEach((stock)=>{
            const investment=stock.purchasePrice * stock.qty
            rows.push({
                sector: sector.sector,
                name: stock.name,
                symbol: stock.exchangeCode ?? "N/A",
                purchasePrice: stock.purchasePrice,
                qty: stock.qty,
                investment
            })
            totalInvestment += investment;

        })
    })
    rows.forEach(row => {
    if (totalInvestment > 0) {
        row.portfolioPercent =
        (row.investment / totalInvestment) * 100;
    } else {
        row.portfolioPercent = 0;
    }
    });
    return rows;
}