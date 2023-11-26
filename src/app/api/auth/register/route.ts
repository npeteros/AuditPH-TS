import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { User } from "@/lib/definitions";
import { sql } from "@vercel/postgres";

async function checkUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

async function regUser(userName: string, email: string, password: string): Promise<User | undefined> {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await sql<User>`
            INSERT INTO users 
                (name, email, password)
            VALUES
                (${userName}, ${email}, ${hashedPassword})`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to register user:', error);
        throw new Error('Failed to register user.');
    }
}

export async function POST(req: Request) {
    const { userName, email, password } = await req.json();
    const exists = await checkUser(email);
    if (exists) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    } else {
        await regUser(userName, email, password);
        return NextResponse.json({ message: "User successfully registered" }, { status: 201 });
    }
}
