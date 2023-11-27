'use server';

import { signIn } from './auth';
import type { User } from './definitions';
import { sql } from '@vercel/postgres';
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user: ', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const data = Object.fromEntries(formData);
    const user = await getUser(String(formData.get('email')));

    if (user) {
        const passwordsMatch = await bcrypt.compare(String(formData.get('password')), user.password);
        if (passwordsMatch) {
            try {
                await signIn('credentials', {
                    redirect: true,
                    redirectTo: '/dashboard',
                    email: data.email,
                    password: data.password
                });
            } catch (error) {
                if ((error as Error).message.includes('CredentialsSignin')) {
                    return 'CredentialsSignin';
                }
                throw error;
            }
        } else {
            return 'CredentialsSignin';
        }
    } else {
        return 'CredentialsSignin';
    }
}