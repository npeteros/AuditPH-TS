'use server';

import { signIn } from './auth';
import bcrypt from "bcrypt";
import prisma from './prisma';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const data = Object.fromEntries(formData);
    const email = String(formData.get('email'));

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    // const user = await getUser(String(formData.get('email')));

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