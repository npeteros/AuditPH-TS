import { fetchTransactionSumByBudgetType } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const email = req.url.split('?email=')[1].replace("%40", "@");
    
    const data = await fetchTransactionSumByBudgetType(email);
    return NextResponse.json({ data: data });
}