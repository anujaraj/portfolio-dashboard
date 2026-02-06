import { UIStock } from "./ui";

export interface SectorGroup {
  sector: string;
  stocks: UIStock[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
}