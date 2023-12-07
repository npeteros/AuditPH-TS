import { Budget } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchBudgetById } from "@/lib/data";

async function checkBudget(type: number, oldBudget: Budget, userId: string) {
    try {
        if(oldBudget.budgetTypeId !== type) {
            const budget = await prisma.budget.findFirst({
                where: {
                    userId,
                    budgetTypeId: type
                }
            })
            return budget;
        } else return null;
    } catch (error) {
        throw new Error()
    }
}

async function patchBudget(id: string, budgetTypeId: number, budgetTotal: number) {
    try {
        const budgetCount = await prisma.budgetType.aggregate({
            _count: true
        });
        if (budgetTypeId >= 1 && budgetTypeId <= budgetCount._count) {
            const newBudget = await prisma.budget.update({
                where: {
                    id
                },
                data: {
                    budgetTypeId,
                    budgetTotal
                }
            })
            return newBudget;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Failed to update existing budget:', error);
        throw new Error('Failed to update existing budget.');
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    });

    const { budgetType, budgetTotal } = await req.json();
    const urlParams = new URL(req.url).searchParams;
    const budgetId = urlParams.get('id');
    if (user && budgetId) {
        const oldBudget = await fetchBudgetById(budgetId);
        if (oldBudget) {
            const exists = await checkBudget(budgetType, oldBudget, user.id);
            console.log(exists)
            if (exists) {
                return NextResponse.json({ message: "Budget already exists" }, { status: 401 });
            } else {
                if (user) {

                    if (budgetId) {
                        const newBudget = await patchBudget(budgetId, budgetType, Number(budgetTotal));
                        if (newBudget) return NextResponse.json({ message: "Budget successfully updated" }, { status: 201 });
                        else return NextResponse.json({ message: "Invalid budget type" }, { status: 400 });
                    }
                }
            }
        }
    }
}
