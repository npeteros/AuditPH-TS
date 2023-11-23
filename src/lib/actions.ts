'use server';

import { signIn } from '@/lib/auth';

export async function authenticate( prevState: string | undefined, formData: FormData ) {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
        if((error as Error).message.includes('CredentialsSignIn')) {
            return 'CredentialsSignIn';
        }
        throw error;
    }
}