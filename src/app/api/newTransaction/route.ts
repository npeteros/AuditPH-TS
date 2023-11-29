import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function postTransaction(userId: string, transactionName: string, budgetTypeId: number, goalId: string, transactionAmount: number) {
    try {
        if(goalId) {
            const newTransaction = await prisma.transaction.create({
                data: {
                    userId,
                    transactionName,
                    budgetTypeId,
                    goalId,
                    transactionAmount
                }
            })
            return newTransaction;
        } else {
            const newTransaction = await prisma.transaction.create({
                data: {
                    userId,
                    transactionName,
                    budgetTypeId,
                    transactionAmount
                }
            })
            return newTransaction;
        }
    } catch (error) {
        console.error('Failed to create new transaction:', error);
        throw new Error('Failed to create new transaction.');
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');

    const { transactionName, budgetTypeId, goalId, transactionAmount } = await req.json();

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? undefined
        },
    });

    const foundBudget = await prisma.budget.findFirst({
        where: {
            budgetType: {
                id: budgetTypeId
            },
            user: {
                id: user?.id
            }
        }
    })

    if (foundBudget) {

        const updatedUser = await prisma.user.update({
            where: {
                email: session?.user?.email ?? undefined
            },
            data: {
                transactions: {
                    increment: 1
                }
            }
        });

        const updatedBudget = await prisma.budget.update({
            where: {
                id: foundBudget.id
            },
            data: {
                budgetCurrent: {
                    increment: transactionAmount
                },
            },
        });

        if(goalId) {
            const updatedGoal = await prisma.goal.update({
                where: {
                    id: goalId
                },
                data: {
                    goalCurrent: {
                        increment: transactionAmount
                    }
                }
            })
        }
        if (user) {
            await postTransaction(user.id, transactionName, budgetTypeId, goalId, transactionAmount);
            return NextResponse.json({ message: "Transaction successfully created" }, { status: 201 });
        }
    } else {
        return NextResponse.json({ message: "Budget not found" }, { status: 400 });
    }


}
