'use client';

import Checkbox from '@/components/Checkbox';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import InputLabel from '@/components/InputLabel';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function Login() {

    const [state, dispatch] = useFormState(authenticate, undefined);

    return (

        <form action={dispatch}>
            <div>

                <InputLabel htmlFor='email' className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value='Email' />

                <TextInput
                    type="email"
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
                    autoComplete="current-password"
                    placeholder='Enter password'
                    required
                />

            </div>

            <div className="block mt-4">
                <label className="flex items-center">
                    <Checkbox
                        name="remember"
                    />
                    <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-200">Remember me</span>
                </label>
            </div>

            <div
                aria-live='polite'
                aria-atomic='true'
            >
                {state === 'CredentialsSignIn' && (
                    <p className='text-sm text-red-600 mt-2'>
                        Invalid credentials
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end mt-4">
                <LoginButton />
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <PrimaryButton className='ml-4' aria-disabled={pending}>
            Log In
        </PrimaryButton>
    );
}
