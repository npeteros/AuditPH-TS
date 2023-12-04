import AuditLogo from '@/components/AuditLogo';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white dark:bg-neutral-800 bg-[url('/cover.svg')]">
            <Link href="/" className='w-3/4 md:w-1/2 lg:w-1/4 ml-20'>
                <AuditLogo className="text-gray-500 w-fit" />
            </Link>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-neutral-200 shadow-md overflow-hidden sm:rounded-lg dark:bg-neutral-600 text-white">
                {children}
            </div>
        </div>
    );
}
