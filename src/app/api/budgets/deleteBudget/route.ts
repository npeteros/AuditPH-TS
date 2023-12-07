import { deleteBudgetById } from "@/lib/data";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? undefined
        },
    });

    const urlParams = new URL(req.url).searchParams;
    const budgetId = urlParams.get('id');

    const data = await deleteBudgetById(String(budgetId));
    if(data) {
        const updated_user = await prisma.user.update({
            where: {
                email: session?.user?.email ?? undefined
            },
            data: {
                budgets: {
                    decrement: 1
                }
            }
        })
    }
    return NextResponse.json({ message: "Budget successfully deleted" }, { status: 201 });
}