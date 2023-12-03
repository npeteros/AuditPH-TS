
import DivLink from "@/components/DivLink";
import { redirect } from "next/navigation";
import { fetchBudgets } from "@/lib/data";
import { auth } from "@/lib/auth";
import BudgetComp from "@/components/Data/BudgetComp";

export default async function Page() {

    const session = await auth();
    if (!session) redirect('/login');
    const budgets = await fetchBudgets(String(session?.user?.email))


    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl mx-auto ">
                    <div
                        className="block w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-4"
                    >
                        <div className="flex justify-between">
                            <div className="p-6 flex flex-col">
                                <span className="font-medium text-lg">Create a Budget</span>
                                <span>Save more by setting a budget</span>
                            </div>
                            <DivLink
                                route="budgets/new"
                                className="p-2 bg-gray-100 my-auto rounded-2xl mr-12"
                            >
                                <svg width="46" height="46" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5v14"></path>
                                    <path d="M5 12h14"></path>
                                </svg>
                            </DivLink>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="my-12">
                        <span className="font-semibold text-xl text-black dark:text-white">My budget</span>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            {budgets?.map(budget =>
                                <BudgetComp key={budget.id} budget={budget} budgetType={budget.budgetType} />
                            )}
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}