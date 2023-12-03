import { Budget } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function checkBudget(type: number): Promise<Budget | null> {
    try {
        const budget = await prisma.budget.findFirst({
            where: {
                budgetTypeId: type
            }
        });
        return budget;
    } catch (error) {
        throw new Error()
    }
}

async function postBudget(userId: string, budgetTypeId: number, budgetTotal: number) {
    try {
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
    } catch (error) {
        console.error('Failed to create new budget:', error);
        throw new Error('Failed to create new budget.');
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if(!session) return redirect('/login');
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    });
    
    const { budgetType, budgetTotal } = await req.json();
    const exists = await checkBudget(budgetType);
    if (exists) {
        return NextResponse.json({ message: "Budget already exists" }, { status: 400 });
    } else {
        if(user) {
            await postBudget(user.id, budgetType, Number(budgetTotal));
            return NextResponse.json({ message: "Budget successfully created" }, { status: 201 });
        }
    }
}
