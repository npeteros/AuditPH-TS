import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import bcrypt from 'bcrypt';

import { sql } from '@vercel/postgres';

import type { User } from '@/lib/definitions';
import type { NextAuthConfig } from 'next-auth';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user: ', error);
        throw new Error('Failed to fetch user.');
    }
}

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(4) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        console.log(user)
                        return user;
                    }
                }
                console.log('Invalid credentials');
                console.log(credentials);
                return null;
            },
        }),
    ],
    callbacks: {
        authorized(params) {
            console.log(params)
            // const isLoggedIn = !!auth?.user;
            // const isOnDashboard = nextUrl.pathname.includes('/dashboard');
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);