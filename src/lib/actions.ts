'use server';

import { signIn } from './auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const obj = Object.fromEntries(formData)
    try {
        await signIn('credentials', {
            redirect: true,
            redirectTo: '/dashboard',
            email: obj.email,
            password: obj.password
        });
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialsSignin';
        }
        throw error;
    }
}