import { Budget } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

function validateDate(dateString: string) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate > currentDate;
}

function stringToDate(dateString: string) {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
    const day = parseInt(parts[2], 10);

    const convertedDate = new Date(year, month, day);
    return convertedDate;
}

async function postGoal(userId: string, goalName: string, goalTarget: number, goalDeadline: Date) {
    try {
        const newGoal = await prisma.goal.create({
            data: {
                userId,
                goalName,
                goalTarget,
                goalDeadline
            }
        });
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                goals: {
                    increment: 1
                }
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
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? undefined
        }
    });

    const { goalName, goalTarget, goalDeadline } = await req.json();

    if (user) {
        if (validateDate(goalDeadline)) {
            await postGoal(user.id, goalName, Number(goalTarget), stringToDate(goalDeadline));
            return NextResponse.json({ message: "Goal successfully created" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "The date must be at least tomorrow!" }, { status: 400 });
        }
    }
}
