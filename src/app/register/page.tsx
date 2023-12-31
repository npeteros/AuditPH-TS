'use client';

import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import LoadingDots from '@/components/LoadingDots';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        user: '',
        email: '',
        password: '',
        success: ''
    });
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user) {
            if (user.password !== user.confirmPass) {
                setErrorMessages({ ...errorMessages, password: "Error: Passwords do not match!" });
            } else {
                try {
                    setLoading(true)
                    fetch('/api/auth/register', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userName: user.userName,
                            email: user.email,
                            password: user.password
                        }),
                    }).then(async (res) => {
                        const msg = await res.json();

                        if (res.status === 201) {
                            const successMsg = msg.message.find((item: { path: [string] }) => item.path && item.path.includes('success'));
                            setErrorMessages({
                                user: '',
                                email: '',
                                password: '',
                                success: successMsg?.message });
                            setLoading(false)
                            setTimeout(() => {
                                router.push("/login");
                            }, 1000);
                        } else {
                            const userError = msg.message.find((item: { path: [string] }) => item.path && item.path.includes('userName'));
                            const passwordError = msg.message.find((item: { path: [string] }) => item.path && item.path.includes('password'));
                            const emailError = msg.message.find((item: { path: [string] }) => item.path && item.path.includes('email'));

                            setErrorMessages({...errorMessages, user: userError?.message, email: emailError?.message, password: passwordError?.message })
                            setLoading(false)
                        }
                    });
                } catch (error) {
                    console.log("Error during registration: ", error);
                }
            }
        } else {
            setErrorMessages({ ...errorMessages, password: "Error: All fields are necessary!" });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="name" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    className={errorMessages.user ? "outline outline-2 rounded-sm outline-red-500 mt-1 block w-full text-sm" : "mt-1 block w-full text-sm"}
                    isFocused={true}
                    placeholder='Enter your username'
                    onChange={e => setUser({ ...user, userName: e.target.value })}
                    required
                />
                {
                    errorMessages.user ?
                        <InputError message={errorMessages.user} className='mt-2 text-red-500' />
                        :
                        null
                }

            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    className={errorMessages.email ? "outline outline-2 rounded-sm outline-red-500 mt-1 block w-full text-sm" : "mt-1 block w-full text-sm"}
                    placeholder='Enter your email address'
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    required
                />

                {
                    errorMessages.email ?
                        <InputError message={errorMessages.email} className='mt-2 text-red-500' />
                        :
                        null
                }

            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    className={errorMessages.password ? "outline outline-2 rounded-sm outline-red-500 mt-1 block w-full text-sm" : "mt-1 block w-full text-sm"}
                    placeholder='Enter your password'
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    required
                />

            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password_confirmation" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    className={errorMessages.password ? "outline outline-2 rounded-sm outline-red-500 mt-1 block w-full text-sm" : "mt-1 block w-full text-sm"}
                    placeholder='Re-enter your password'
                    onChange={e => setUser({ ...user, confirmPass: e.target.value })}
                    required
                />

                {
                    errorMessages.password ?
                        <InputError message={errorMessages.password} className='mt-2 text-red-500' />
                        :
                        null
                }
            </div>

            <div className="mt-4">
                <InputError message={errorMessages.success} className='text-emerald-500' />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/login"
                    className="underline text-sm text-neutral-600 dark:text-neutral-200 dark:hover:text-gray-500 hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <PrimaryButton className='ml-4' disabled={loading}>
                    {
                        loading ? (
                            <div>
                                <LoadingDots color="#808080" />
                            </div>
                        ) : (
                            <span>Register</span>
                        )
                    }
                </PrimaryButton>
            </div>
        </form>
    );
}