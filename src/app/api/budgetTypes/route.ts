import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET() {
    const fetchedData = await prisma.budgetType.findMany();
    return NextResponse.json(fetchedData);
}