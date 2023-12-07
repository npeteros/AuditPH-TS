import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TransactionType } from "@prisma/client";
import { fetchTransactionById } from "@/lib/data";

async function patchTransaction(transactionId: string, transactionName: string, budgetTypeId: number, goalId: string, transactionAmount: number, transactionType: TransactionType) {
    try {
        if (goalId) {
            if (budgetTypeId) {

                const budgetCount = await prisma.budgetType.aggregate({
                    _count: true
                });
                if (budgetTypeId >= 1 && budgetTypeId <= budgetCount._count) {
                    const newTransaction = await prisma.transaction.update({
                        where: {
                            id: transactionId
                        },
                        data: {
                            transactionName,
                            budgetTypeId,
                            goalId,
                            transactionAmount,
                            transactionType
                        }
                    })
                    return newTransaction;
                }
            } else {
                const newTransaction = await prisma.transaction.update({
                    where: {
                        id: transactionId
                    },
                    data: {
                        transactionName,
                        goalId,
                        transactionAmount,
                        transactionType
                    }
                })
                return newTransaction;
            }
        } else {
            if (budgetTypeId) {
                const budgetCount = await prisma.budgetType.aggregate({
                    _count: true
                });
                if (budgetTypeId >= 1 && budgetTypeId <= budgetCount._count) {
                    const newTransaction = await prisma.transaction.update({
                        where: {
                            id: transactionId
                        },
                        data: {
                            transactionName,
                            budgetTypeId,
                            transactionAmount,
                            transactionType
                        }
                    })
                    return newTransaction;
                }
            } else {
                const newTransaction = await prisma.transaction.update({
                    where: {
                        id: transactionId
                    },
                    data: {
                        transactionName,
                        transactionAmount,
                        transactionType
                    }
                })
                return newTransaction;
            }
        }
    } catch (error) {
        console.error('Failed to update existing transaction:', error);
        throw new Error('Failed to update existing transaction.');
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? undefined
        },
    });
    
    const { transactionName, budgetTypeId, goalId, transactionAmount, transactionType } = await req.json();
    const urlParams = new URL(req.url).searchParams;
    const transactionId = urlParams.get('id');

    if (user && transactionId) {
        const oldTransaction = await fetchTransactionById(transactionId);
        const newTransaction = await patchTransaction(transactionId, transactionName, budgetTypeId, goalId, Number(transactionAmount), transactionType);
        if (newTransaction && oldTransaction) {
            if (transactionType === 'INCOME') {
                const updatedUser = await prisma.user.update({
                    where: {
                        email: session?.user?.email ?? undefined
                    },
                    data: {
                        income: {
                            increment: Number(transactionAmount) - Number(oldTransaction.transactionAmount)
                        }
                    }
                });
            } else {
                const updatedUser = await prisma.user.update({
                    where: {
                        email: session?.user?.email ?? undefined
                    },
                    data: {
                        expenses: {
                            increment: Number(transactionAmount) - Number(oldTransaction.transactionAmount)
                        }
                    }
                });
            }

            if (budgetTypeId) {

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
                
                const updatedBudget = await prisma.budget.update({
                    where: {
                        id: foundBudget?.id
                    },
                    data: {
                        budgetCurrent: {
                            increment: Number(transactionAmount) - Number(oldTransaction.transactionAmount)
                        },
                    },
                });
            }

            if (goalId) {
                const updatedGoal = await prisma.goal.update({
                    where: {
                        id: goalId
                    },
                    data: {
                        goalCurrent: {
                            increment: Number(transactionAmount) - Number(oldTransaction.transactionAmount)
                        }
                    }
                })
            }
            return NextResponse.json({ message: "Transaction successfully updated" }, { status: 201 });
        }
    } else {
        return NextResponse.json({ message: "Budget not found" }, { status: 400 });
    }


}
