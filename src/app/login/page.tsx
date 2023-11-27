'use client';

import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import InputLabel from '@/components/InputLabel';
import LoadingDots from '@/components/LoadingDots';
import Link from 'next/link';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function Login() {

    const [state, dispatch] = useFormState(authenticate, undefined);

    return (

        <form action={dispatch}>
            <div>

                <InputLabel htmlFor='email' className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value='Email' />

                <TextInput
                    id='email'
                    type="email"
                    name='email'
                    className="mt-1 block w-full"
                    autoComplete="email"
                    isFocused={true}
                    placeholder='Enter your email address'
                    required
                />

            </div>

            <div className="mt-4">
                <InputLabel htmlFor='password' className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value='Password' />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    className="mt-1 block w-full"
                    autoComplete="password"
                    placeholder='Enter password'
                    required
                />

            </div>

            <div
                aria-live='polite'
                aria-atomic='true'
            >
                {state === 'CredentialsSignin' && (
                    <p className='text-sm text-red-600 mt-2'>
                        Invalid credentials
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/register"
                    className="underline text-sm text-neutral-600 dark:text-neutral-200 dark:hover:text-gray-500 hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Don't have an account?
                </Link>
                
                <LoginButton />
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <PrimaryButton className='ml-4' disabled={pending}>
            {
                pending ? (
                    <div>
                        <LoadingDots color="#808080" />
                    </div>
                ) : (
                    <span>Log In</span>
                )
            }
        </PrimaryButton>
    );
}
