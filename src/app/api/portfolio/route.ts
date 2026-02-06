import { NextResponse } from "next/server";
import portfolio from "@/data/portfolio.json";
import { transformPortfolio } from "@/lib/transformPortfolio";
import { calculatePortfolio } from "@/lib/calculatePortfolio";
import { enrichPortfolio } from "@/lib/enrichPortfolio";

export async function GET() {
  const transformed = transformPortfolio(portfolio);
  const calculated = calculatePortfolio(transformed);
  const enriched =  await enrichPortfolio(calculated);
  return NextResponse.json(enriched);
}
