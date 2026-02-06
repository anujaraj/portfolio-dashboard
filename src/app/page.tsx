import { UIStock } from "@/types/ui";
import PortfolioTable from "@/components/PortfolioTable";
import PortfolioContainer from "@/components/PortfolioContainer";


  async function getPortfolio(){
    const res=await fetch("http://localhost:3000/api/portfolio",{
      cache:"no-store"
    })
    if(!res.ok){
      throw new Error("Failed to fetch potfolio");
    }
    return res.json();
  }

export default async function Home() {

  const rows : UIStock[]=await getPortfolio();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Portfolio Dashboard
      </h1>

      <div className="overflow-x-auto border rounded-lg">
        <PortfolioContainer initialData={rows}/>
      </div>
    </main>
  );
}
