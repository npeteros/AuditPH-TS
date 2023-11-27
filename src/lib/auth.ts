import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import bcrypt from 'bcrypt';
import prisma from './prisma';

import type { User } from '@/lib/definitions';
import type { NextAuthConfig } from 'next-auth';

async function getUser(email: string): Promise<User | null> {
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

export const authConfig = {
    debug: true,
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
                        return user;
                    }
                }
                // console.log('Invalid credentials');
                // console.log("Invalid log in: ", credentials);
                return null;
            },
        }),
    ],
    callbacks: {
        authorized(params) {
            // console.log('hi!!!')
            return !!params.auth?.user;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);