import TransactionComp from "@/components/Data/TransactionComp";
import DivLink from "@/components/DivLink";
import { auth } from "@/lib/auth";
import { fetchTransactions } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await auth();
    if(!session) redirect('/login');
    const transactions = await fetchTransactions(String(session?.user?.email));

    return (

        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="block w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-4">
                <div className="flex justify-between">
                    <div className="p-6 flex flex-col">
                        <span className="font-medium text-lg">Add a Transaction</span>
                        <span>Be financially aware and record your transactions</span>
                    </div>
                    <DivLink
                        route="transactions/new"
                        className="p-2 bg-gray-100 my-auto rounded-2xl mr-12"
                    >
                        <svg width="46" height="46" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5v14"></path>
                            <path d="M5 12h14"></path>
                        </svg>
                    </DivLink>
                </div>
            </div>

            <div className="my-12">
                <span className="font-semibold text-xl text-black dark:text-white">My transactions</span>
                {transactions?.map(transaction =>
                    <TransactionComp key={transaction.id} transaction={transaction} budgetType={transaction.budgetType} />
                )}
            </div>
        </div>
    );
}