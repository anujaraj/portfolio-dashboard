"use client";

import { useEffect, useState } from "react";
import { UIStock } from "@/types/ui";
import PortfolioTable from "./PortfolioTable";
import { groupBySector } from "@/lib/groupBySector";



export default function PortfolioContainer({
  initialData
}: {
  initialData: UIStock[];
}) {
  const [data, setData] = useState<UIStock[]>(initialData);
  const [error, setError] = useState<string | null>(null);

  const grouped = groupBySector(data);
  console.log(grouped);

  async function refresh() {
    try{
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      const updated = await res.json();
      setData(updated);
      }catch(err){
        setError("Failed to refresh portfolio data");
      }
  }

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 15000);
    return () => clearInterval(id);
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }


return (
  <div className="space-y-8">
    {grouped.map(group => (
      <section key={group.sector}>
        <div className="bg-gray-50 border rounded p-4 mb-2">
          <h2 className="text-lg font-semibold">
            {group.sector} ({group.stocks.length} stocks)
          </h2>

          <div className="text-sm mt-1 flex gap-6">
            <span>Investment: ₹{group.totalInvestment}</span>
            <span>Present Value: ₹{group.totalPresentValue}</span>
            <span
              className={
                group.totalGainLoss >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              Gain/Loss: ₹{group.totalGainLoss}
            </span>
          </div>
        </div>

       
        <PortfolioTable data={group.stocks} />
      </section>
    ))}
  </div>
);


}
