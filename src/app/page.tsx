import { UIStock } from "@/types/ui";
import PortfolioContainer from "@/components/PortfolioContainer";
import portfolioData from "@/data/portfolio.json";

import { transformPortfolio } from "@/lib/transformPortfolio";
import { enrichPortfolio } from "@/lib/enrichPortfolio";
import { calculatePortfolio } from "@/lib/calculatePortfolio";

export default async function Home() {

  const rows: UIStock[] = transformPortfolio(portfolioData);
  const enrichedRows = await enrichPortfolio(rows);
  const finalRows = calculatePortfolio(enrichedRows);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Portfolio Dashboard
      </h1>

      <div className="overflow-x-auto border rounded-lg">
        <PortfolioContainer initialData={finalRows} />
      </div>
    </main>
  );
}
