import { Budget } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function postGoal(userId: string, goalName: string, goalTarget: number) {
    try {
        const newGoal = await prisma.goal.create({
            data: {
                userId,
                goalName,
                goalTarget
            }
        })
        return newGoal;
    } catch (error) {
        console.error('Failed to create new goal:', error);
        throw new Error('Failed to create new goal.');
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return redirect('/login');
    const user = await prisma.user.update({
        where: {
            email: session?.user?.email ?? undefined
        },
        data: {
            goals: {
                increment: 1
            }
        }
    });

    const { goalName, goalTarget } = await req.json();

    if (user) {
        await postGoal(user.id, goalName, goalTarget);
        return NextResponse.json({ message: "Goal successfully created" }, { status: 201 });
    }
}
