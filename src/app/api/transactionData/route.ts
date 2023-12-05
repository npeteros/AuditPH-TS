import { BudgetType } from "@/lib/definitions";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const email = req.url.split('?email=')[1].replace("%40", "@");

    const client = await prisma.user.findFirst({
        where: {
            email
        }
    })
    const getExistingBudgets = await prisma.user.findFirst({
        where: { email },
        include: {
            Budget: {
                include: {
                    budgetType: true
                }
            }
        }
    });

    const fetchedBudgetTypes = getExistingBudgets?.Budget.map(item => item.budgetType)

    console.log(fetchedBudgetTypes)

    const fetchedUserGoals = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            Transaction: true
        }
    });
    return NextResponse.json({ budgetTypes: fetchedBudgetTypes, goals: fetchedUserGoals?.Transaction});
}