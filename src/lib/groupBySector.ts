import { UIStock } from "@/types/ui";
import { SectorGroup } from "@/types/grouped";

export function groupBySector(stocks:UIStock[]):SectorGroup[]{

    const map = new Map<string,UIStock[]>();

    stocks.forEach(stock=>{
        if(!map.has(stock.sector)){
            map.set(stock.sector, [])
        }
        map.get(stock.sector)!.push(stock)
    })

    return Array.from(map.entries()).map(([sector, stocks])=>{
        const totalInvestment= stocks.reduce((sum , s)=> sum+s.investment,0);
        const totalPresentValue = stocks.reduce((sum,s)=>sum+(s.presentValue??0),0);
        const totalGainLoss = totalPresentValue-totalInvestment;
        return {
            sector,
            stocks,
            totalInvestment,
            totalPresentValue,
            totalGainLoss
        };
    });
}