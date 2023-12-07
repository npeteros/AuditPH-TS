import { fetchTransactionById } from "@/lib/data";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const urlParams = new URL(req.url).searchParams;
    const email = urlParams.get('email');
    const transactionId = urlParams.get('id');

    if (email) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        const data = await fetchTransactionById(String(transactionId));
        if (data?.userId === user?.id) return NextResponse.json({ data: data });
        else return NextResponse.json({ status: 400 })
    } else {
        return NextResponse.json({ status: 401 })
    }
}