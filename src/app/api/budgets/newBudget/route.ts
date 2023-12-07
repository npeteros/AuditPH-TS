import { Budget } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function checkBudget(type: number, userId: string) {
    try {
        const budget = await prisma.budget.findFirst({
            where: {
                userId,
                budgetTypeId: type
            }
        })
        // console.log(budget)
        return budget;
    } catch (error) {
        throw new Error()
    }
}

async function postBudget(userId: string, budgetTypeId: number, budgetTotal: number) {
    try {
        const budgetCount = await prisma.budgetType.aggregate({
            _count: true
        });
        if (budgetTypeId >= 1 && budgetTypeId <= budgetCount._count) {
            const newBudget = await prisma.budget.create({
                data: {
                    userId,
                    budgetTypeId,
                    budgetTotal
                }
            })
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    budgets: {
                        increment: 1
                    }
                }
            })
            return newBudget;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Failed to create new budget:', error);
        throw new Error('Failed to create new budget.');
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    });

    const { budgetType, budgetTotal } = await req.json();
    if (user) {
        const exists = await checkBudget(budgetType, user.id);
        if (exists) {
            return NextResponse.json({ message: "Budget already exists" }, { status: 400 });
        } else {
            if (user) {
                const newBudget = await postBudget(user.id, budgetType, Number(budgetTotal));
                if(newBudget) return NextResponse.json({ message: "Budget successfully created" }, { status: 201 });
                else return NextResponse.json({ message: "Invalid budget type" }, { status: 400 });
            }
        }
    }
}
