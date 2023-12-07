import GoalComp from "@/components/Data/GoalComp";
import DivLink from "@/components/DivLink";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchGoals } from "@/lib/data";

export default async function Page() {

    const session = await auth();
    if (!session) redirect('/login');
    const goals = await fetchGoals(String(session?.user?.email))

    return (

        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="block w-full bg-white border-gray-300 focus:border-indigo-300 rounded-3xl shadow-sm my-4">
                <div className="flex justify-between">
                    <div className="p-6 flex flex-col">
                        <span className="font-medium text-lg">Create a Goal</span>
                        <span>Reach more goals and be more productive</span>
                    </div>
                    <DivLink
                        route="/goals/new"
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
                <span className="font-semibold text-xl text-black dark:text-white">My goals</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {goals?.map(goal =>
                        <DivLink
                            key={goal.id}
                            route={`goals/edit/${goal.id}`}
                            className=""
                        >
                            <GoalComp key={goal.id} goal={goal} />
                        </DivLink>
                    )}
                </div>
            </div>
        </div>
    );
}