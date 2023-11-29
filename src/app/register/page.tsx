'use client';

import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import LoadingDots from '@/components/LoadingDots';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export default function Register() {

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user) {
            if (user.password !== user.confirmPass) {
                setMessage("Error: Passwords do not match!");
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
                            setStatus(res.status);
                            setMessage(msg.message);
                            setLoading(false)
                            setTimeout(() => {
                                router.push("/login");
                            }, 2000);
                        } else {
                            setMessage(msg.message);
                            setLoading(false)
                        }
                    });
                } catch (error) {
                    console.log("Error during registration: ", error);
                }
            }
        } else {
            setMessage("Error: All fields are necessary!");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="name" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    className="mt-1 block w-full text-sm"
                    isFocused={true}
                    placeholder='Enter your username'
                    onChange={e => setUser({ ...user, userName: e.target.value })}
                    required
                />

            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    className="mt-1 block w-full text-sm"
                    placeholder='Enter your email address'
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    required
                />

            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    className="mt-1 block w-full text-sm"
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
                    className="mt-1 block w-full text-sm"
                    placeholder='Re-enter your password'
                    onChange={e => setUser({ ...user, confirmPass: e.target.value })}
                    required
                />

            </div>

            <div className="mt-4">
                {
                    status === 201 ?
                        <InputError message={message} className='text-emerald-500' />
                        :
                        <InputError message={message} className='text-red-500' />
                }

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