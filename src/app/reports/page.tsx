import TransactionComp from "@/components/Data/TransactionComp";
import DivLink from "@/components/DivLink";
import { auth } from "@/lib/auth";
import { fetchTransactions } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await auth();
    if (!session) redirect('/login');
    const transactions = await fetchTransactions(String(session?.user?.email));

    return (

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-4">
                <div className="p-4 flex">
                    <div className="bg-[#fdb462] w-fit rounded-full p-2 m-4">
                        <svg width="34" height="34" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12h4l3 8 4-16 3 8h4"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div>Budget Insights</div>
                        <div>Hello</div>
                    </div>
                </div>
            </div>


        </div>
    );
}