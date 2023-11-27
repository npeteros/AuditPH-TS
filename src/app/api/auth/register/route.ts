import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import type { User } from "@/lib/definitions";
import prisma from '@/lib/prisma';

async function checkUser(email: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

async function regUser(userName: string, email: string, password: string): Promise<User | undefined> {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: userName,
                email: email,
                password: hashedPassword
            }
        })
        return user;
    } catch (error) {
        console.error('Failed to register user:', error);
        throw new Error('Failed to register user.');
    }
}

export async function POST(req: Request) {
    const { userName, email, password } = await req.json();
    const exists = await checkUser(email);
    if (exists) {
        console.log(1)
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    } else {
        await regUser(userName, email, password);
        return NextResponse.json({ message: "User successfully registered" }, { status: 201 });
    }
}
