import { UIStock } from "@/types/ui";

export function calculatePortfolio(stocks:UIStock[]){

    const totalInvestment=stocks.reduce(
        (sum,s)=> sum+s.investment,
        0
    )

    return stocks.map((stock)=>{
        const portfolioPercent= totalInvestment>0 ? (stock.investment/totalInvestment) *100 : 0;

        return {
            ...stock,
            portfolioPercent : Number(portfolioPercent.toFixed(2))
        }
})
}