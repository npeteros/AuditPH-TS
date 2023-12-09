import { deleteTransactionById, fetchTransactionById } from "@/lib/data";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

async function checkBudget(type: number, userId: string) {
    try {
        const budget = await prisma.budget.findFirst({
            where: {
                userId,
                budgetTypeId: type
            }
        })
        return budget;
    } catch (error) {
        throw new Error()
    }
}

async function checkGoal(goalId: string) {
    try {
        if (goalId != "null") {
            const goal = await prisma.goal.findFirst({
                where: {
                    id: goalId
                }
            })

            return goal;
        }
    } catch (error) {
        throw new Error()
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? undefined
        },
    });

    const urlParams = new URL(req.url).searchParams;
    const transactionId = urlParams.get('id');

    const data = await fetchTransactionById(String(transactionId));
    if (data && user) {
        const budget = await checkBudget(Number(data.budgetTypeId), data.userId);
        const goal = await checkGoal(String(data.goalId));
        if (budget) {
            const updatedBudget = await prisma.budget.update({
                where: {
                    id: budget.id
                },
                data: {
                    budgetCurrent: {
                        decrement: data.transactionAmount
                    }
                }
            })
        }
        if (goal) {
            const updatedGoal = await prisma.goal.update({
                where: {
                    id: goal.id
                },
                data: {
                    goalCurrent: {
                        decrement: data.transactionAmount
                    }
                }
            })
        };
        if (data.transactionType === 'INCOME') {
            const updated_user = await prisma.user.update({
                where: {
                    email: session?.user?.email ?? undefined
                },
                data: {
                    income: {
                        decrement: data.transactionAmount
                    },
                    transactions: {
                        decrement: 1
                    }
                }
            })
        } else {
            const updated_user = await prisma.user.update({
                where: {
                    email: session?.user?.email ?? undefined
                },
                data: {
                    expenses: {
                        decrement: data.transactionAmount
                    },
                    transactions: {
                        decrement: 1
                    }
                }
            })
        }
        const deletedTransaction = await deleteTransactionById(String(transactionId));
        return NextResponse.json({ message: "Transaction successfully deleted" }, { status: 201 });
    }
}