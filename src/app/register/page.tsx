import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import Link from 'next/link';

export default function Register() {

    return (
        <form>
            <div>
                <InputLabel htmlFor="name" className='block font-medium text-sm text-neutral-600 dark:text-neutral-200' value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    className="mt-1 block w-full text-sm"
                    autoComplete="username"
                    isFocused={true}
                    placeholder='Enter your username'
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
                    autoComplete="email"
                    placeholder='Enter your email address'
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
                    autoComplete="new-password"
                    placeholder='Enter your password'
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
                    autoComplete="new-password"
                    placeholder='Re-enter your password'
                    required
                />

            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/login"
                    className="underline text-sm text-neutral-600 dark:text-neutral-200 dark:hover:text-gray-500 hover:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <PrimaryButton className="ml-4">
                    Register
                </PrimaryButton>
            </div>
        </form>
    );
}
