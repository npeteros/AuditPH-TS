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