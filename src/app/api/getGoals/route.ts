import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const user = req.url.split('?email=')[1].replace("%40", "@");
    const client = await prisma.user.findFirst({
        where: {
            email: user
        }
    })
    const userId = client?.id;
    const fetchedData = await prisma.goal.findMany({
        where: {
            userId
        }
    });
    return NextResponse.json(fetchedData);
}