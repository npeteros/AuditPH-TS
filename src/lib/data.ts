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

type LedgerTable = {
    id: string,
    userId: string,
    budgetTypeId: number | null,
    goalId: string,
    transactionAmount: number,
    createdAt: Date,
    transactionName: string,
    transactionType: 'INCOME' | 'EXPENSE',
    typename: string | null
}

export async function fetchFilteredTransactions(email: string, query: string) {
    noStore();

    try {
        const filteredTransactions = await sql<LedgerTable>`
        SELECT t.*, COALESCE(bt."typeName", null) AS typeName
        FROM "Transaction" t
        LEFT JOIN "BudgetType" bt ON t."budgetTypeId" = bt."id"
        WHERE (
        ("createdAt"::TEXT ILIKE ${`%${query}%`} OR
        "transactionName" ILIKE ${`%${query}%`} OR
        "transactionType"::TEXT ILIKE ${`%${query}%`} OR
        "transactionAmount"::TEXT ILIKE ${`%${query}%`})
        AND "userId" = (SELECT "id" FROM "User" WHERE "email" = ${email})
        );
    `;
        return filteredTransactions.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}