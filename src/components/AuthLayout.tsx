"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuditLogo from '@/components/AuditLogo';
import Dropdown from '@/components/Dropdown';
import NavLink from '@/components/NavLink';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import { useSession } from 'next-auth/react';
import { SignOut } from './Auth/SignOut';
import ResponsiveNavText from './ResponsiveNavText';
import { redirect } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const pathName = usePathname();
    const { data: session } = useSession();
    if(!session) return redirect('/login');

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-800 bg-[url('/cover.svg')]">
            <nav className="border-b border-gray-100 bg-white dark:bg-neutral-800">
                <div className="max-w-sm md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <AuditLogo className="w-20 dark:w-16" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href='/dashboard' active={pathName ? pathName.includes("/dashboard") : false} className='dark:text-slate-100'>
                                    Dashboard
                                </NavLink>
                                <NavLink href='/goals' active={pathName ? pathName.includes("/goals") : false} className='dark:text-slate-100'>
                                    Goals
                                </NavLink>
                                <NavLink href='/budgets' active={pathName ? pathName.includes("/budgets") : false} className='dark:text-slate-100'>
                                    Budgets
                                </NavLink>
                                <NavLink href='/transactions' active={pathName ? pathName.includes("/transactions") : false} className='dark:text-slate-100'>
                                    Transactions
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-3 border border-transparent text-sm leading-4 font-medium rounded-md text-neutral-600 dark:text-white hover:dark:text-neutral-400 hover:text-neutral-900 hover:bold focus:outline-none transition ease-in-out duration-150 bg-neutral-50 shadow-lg dark:bg-neutral-600"
                                            >
                                                {session?.user?.name}


                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            className=''
                                            href="/profile.edit"
                                        >Profile</Dropdown.Link>
                                        <form
                                            action={SignOut}
                                            className="w-full"
                                        >
                                            <button className='w-full'>
                                                <Dropdown.Text
                                                    className=''
                                                >
                                                    Log Out
                                                </Dropdown.Text>
                                            </button>
                                        </form>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-neutral-400 focus:text-neutral-700 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden max-w-sm md:max-w-md lg:max-w-7xl'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="/dashboard" active={pathName ? pathName.includes("/dashboard") : false} className='dark:text-slate-100'>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/goals' active={pathName ? pathName.includes("/goals") : false} className=' dark:text-slate-100'>
                            Goals
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/budgets' active={pathName ? pathName.includes("/budgets") : false} className=' dark:text-slate-100'>
                            Budgets
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/transactions' active={pathName ? pathName.includes("/transactions") : false} className=' dark:text-slate-100'>
                            Transactions
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base dark:text-white dark:hover:text-white-600 text-neutral-600">{session?.user?.name}</div>
                            <div className="font-medium text-sm text-gray-400">{session?.user?.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                active={false}
                                href="/profile.edit"
                                className='text-neutral-600'
                            >Profile</ResponsiveNavLink>
                            <form
                                action={SignOut}
                                className="w-full"
                            >
                                <button className='w-full'>
                                    <ResponsiveNavText
                                        active={false}
                                        className='text-neutral-600'
                                    >
                                        Log Out
                                    </ResponsiveNavText>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}