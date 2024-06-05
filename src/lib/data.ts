import { sql } from '@vercel/postgres';
import prisma from './prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchBudgets(email: string) {
    // Add noStore() here prevent the response from being cached.
    noStore();

    try {

        const client = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                Budget: {
                    include: {
                        budgetType: true
                    }
                }
            }
        })
        return client?.Budget;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchGoals(email: string) {
    noStore();

    try {
        const client = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                Goal: true
            }
        })
        return client?.Goal;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchTransactions(email: string) {
    noStore();

    try {
        const client = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                Transaction: {
                    include: {
                        budgetType: true
                    }
                }
            }
        })
        return client?.Transaction;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

interface LedgerTable {
    id: string;
    userId: string;
    budgetTypeId: number | null;
    goalId: string;
    transactionAmount: number;
    createdAt: Date;
    transactionName: string;
    transactionType: 'INCOME' | 'EXPENSE';
    typename: string | null;
}

export async function fetchFilteredTransactions(email: string, query: string) {
    noStore();

    try {
        
        const filteredTransactions = await prisma.transaction.findMany({
            where: {
                transactionName: {
                    contains: query,
                    mode: 'insensitive'
                },
                user: {
                    email
                }
            }
        })
        
        return filteredTransactions;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch transactions data.');
    }
}

export async function fetchBudgetById(id: string) {
    noStore();

    try {
        const budget = await prisma.budget.findUnique({
            where: {
                id
            }
        });
        return budget;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch budget data.');
    }
}

export async function fetchGoalById(id: string) {
    noStore();

    try {
        const goal = await prisma.goal.findUnique({
            where: {
                id
            }
        });
        return goal;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch goal data.');
    }
}

export async function fetchTransactionById(id: string) {
    noStore();

    try {
        const client = await prisma.transaction.findUnique({
            where: {
                id
            }
        })
        return client;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch transaction data.');
    }
}

export async function deleteBudgetById(id: string) {
    noStore();

    try {
        const budget = await prisma.budget.delete({
            where: {
                id
            }
        });
        return budget;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete budget data.');
    }
}

export async function deleteGoalById(id: string) {
    noStore();

    try {
        const goal = await prisma.goal.delete({
            where: {
                id
            }
        });
        return goal;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete goal data.');
    }
}

export async function deleteTransactionById(id: string) {
    noStore();

    try {
        const transaction = await prisma.transaction.delete({
            where: {
                id
            }
        });
        return transaction;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete transaction data.');
    }
}

export interface TransactionSumByBudgetType {
    budgetType: string;
    sum: number;
}

export async function fetchTransactionSumByBudgetType(email: string) {
    noStore();

    try {
        const budgetType = await prisma.budgetType.findMany({
            include: {
                Transaction: {
                    where: {
                        user: {
                            email
                        }
                    },
                    select: {
                        transactionAmount: true
                    }
                }
            }
        })
        const budgetTypeWithSum: TransactionSumByBudgetType[] = [];
        budgetType.map(bt => {
            let sum = 0;
            bt.Transaction.map(t => {
                sum += Number(t.transactionAmount);
            })
            const budgettype: TransactionSumByBudgetType = { budgetType: bt.typeName, sum: sum };
            budgetTypeWithSum.push(budgettype);
        })
        return budgetTypeWithSum;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch transaction by budget type data.');
    }
}