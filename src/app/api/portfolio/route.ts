import { NextResponse } from "next/server";
import portfolio from "@/data/portfolio.json";
import { transformPortfolio } from "@/lib/transformPortfolio";
import { calculatePortfolio } from "@/lib/calculatePortfolio";
import { enrichPortfolio } from "@/lib/enrichPortfolio";

export async function GET() {
  const transformed = transformPortfolio(portfolio);
  //console.log("Raw "+ portfolio)
  //console.log("transformed "+ transformed)
  const calculated = calculatePortfolio(transformed);
  //console.log("calculated "+ calculated)

  const enriched =  await enrichPortfolio(calculated);
  // console.log("enriched "+ enriched)

  return NextResponse.json(enriched);
}
