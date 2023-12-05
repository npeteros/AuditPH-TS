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
        <>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-6">
                    <div className="p-4 flex">
                        <div className="bg-[#95d7a4] w-fit rounded-full p-2 m-4">
                            <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12h4l3 8 4-16 3 8h4"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="font-bold text-2xl ">Budget Insights</div>
                            <div className="text-lg">Hello</div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-6">
                    <div className="p-4 flex">
                        <div className="bg-[#6d05ff] w-fit rounded-full p-2 m-4">
                            <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Z"></path>
                                <path d="M14 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                                <path d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="font-bold text-2xl">Budget Category</div>
                            <div className="text-lg">Hi</div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-6">
                    <div className="p-4 flex">
                        <div className="bg-[#ff00a8] w-fit rounded-full p-2 m-4">
                            <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
                                <path d="M14 11h-2.5a1.5 1.5 0 1 0 0 3h1a1.5 1.5 0 1 1 0 3H10"></path>
                                <path d="M12 10v1m0 6v1-1Z"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="font-bold text-2xl">My Networth</div>
                            <div className="text-lg">See your progression overtime</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}  
