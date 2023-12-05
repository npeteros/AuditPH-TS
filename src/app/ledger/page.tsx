import DivLink from "@/components/DivLink";
import Search from "@/components/Search";
import TransactionsTable from "@/components/TransactionsTable";


export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    return (
        <>
            <div className="max-w-7xl mx-auto my-4 p-4 sm:p-6 lg:p-8">
                <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className='text-2xl text-white'>My Ledger</h1>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                        <Search placeholder="Search transactions..." />
                        <DivLink
                            route="/transactions/new"
                            className="flex h-10 items-center rounded-lg bg-neutral-700 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
                        >
                            <span className="hidden md:block">Add Transaction</span>{' '}
                            <div className="h-5.5 md:ml-2">
                                <svg width="24" height="24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5v14"></path>
                                    <path d="M5 12h14"></path>
                                </svg>
                            </div>
                        </DivLink>
                    </div>
                    <TransactionsTable query={query} />
                </div>
            </div>
        </>
    );
}