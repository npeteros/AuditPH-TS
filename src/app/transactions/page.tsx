import DivLink from "@/components/DivLink";

export default function Page () {
    return (

        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="block w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-4">
                <div className="flex justify-between">
                    <div className="p-6 flex flex-col">
                        <span className="font-medium text-lg">Add a Transaction</span>
                        <span>Record your transactions and be financially aware</span>
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
                {/* {transactions.map(transaction =>
                        <Transaction key={transaction.id} transaction={transaction} />
                    )} */}
            </div>
        </div>
    );
}