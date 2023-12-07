import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import type { User } from "@/lib/definitions";
import prisma from '@/lib/prisma';
import { z } from 'zod';

async function checkUser(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    console.log(user);
    return user;
}

async function regUser(userName: string, email: string, password: string) {
    try {
        const credentials = { userName, email, password }
        const parsedCredentials = z
            .object({
                userName: z.string().min(6, { message: "Username must be 6 or more characters long!" }),
                email: z.string().email({ message: "Invalid email address!" }),
                password: z.string().min(6, { message: "Password must be 6 or more characters long!" })
            })
            .safeParse(credentials);
        if (parsedCredentials.success) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name: userName,
                    email: email,
                    password: hashedPassword
                }
            })
            return true;
        } else {
            // console.log(parsedCredentials.error.errors)
            return parsedCredentials.error.errors;
        }

    } catch (error) {
        console.error('Failed to register user:', error);
        throw new Error('Failed to register user.');
    }
}

export async function POST(req: Request) {
    const { userName, email, password } = await req.json();
    const exists = await checkUser(email);
    if (exists) {
        return NextResponse.json({ message: [{ message: "Email already exists", path: ["email"] }] }, { status:400 });
    } else {
        const response = await regUser(userName, email, password);
        if (response === true) return NextResponse.json({ message: [{ message: "User successfully registered", path: ["success"] }] }, { status: 201 });
        return NextResponse.json({ message: response }, { status: 400 })
    }
}
