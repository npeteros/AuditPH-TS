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
    return (
        <>
            <div className="max-w-7xl my-10 mx-auto rounded-lg flex flex-col items-center">
                <div className="flex flex-col items-center text-white">
                    <p className="text-4xl pt-14 pb-2">AuditPH</p>
                    <p className="text-2xl p-1 pb-2">MY LEDGER</p>
                </div>
                <div className="max-w-6xl w-full my-4">
                    <Search placeholder="Search transasctions..." />
                    {
                        // query.length > 3 ? <TransactionsTable query={query} /> : <TransactionsTable query="" />
                    }
                    
                </div>
            </div>
        </>
    );
}