import { Goal } from "@prisma/client";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function GoalComp({ goal }: { goal: Goal }) {
    return (
        <div className=" bg-neutral-100 shadow-lg rounded-3xl w-full">
            <div className="p-6">
                <div className="flex justify-between my-1">
                    <span className="text-base font-medium text-neutral-700 dark:text-black">
                        {goal.goalName}
                    </span>
                    <span className="text-sm font-medium text-neutral-700 dark:text-black">
                        {
                            ((goal.goalCurrent / goal.goalTarget) * 100) > 100
                                ? 100
                                : parseFloat(String((goal.goalCurrent / goal.goalTarget) * 100)).toFixed()

                        } %
                    </span>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-medium text-neutral-700 dark:text-black mb-3 text-justify">
                        &#8369; {goal.goalCurrent.toLocaleString()} / {goal.goalTarget.toLocaleString()}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
                        <div className="bg-blue-400 h-2.5 rounded-full max-w-full" style={{ width: `${(goal.goalCurrent / goal.goalTarget) * 100}%` }} />
                    </div>
                    <div className="mt-4 -mb-2">
                        {
                            ((goal.goalCurrent / goal.goalTarget) * 100) < 100
                                ?
                                <span className={
                                    dayjs(goal.goalDeadline).diff(dayjs().format(), "h") <= 24
                                        ?
                                        dayjs(goal.goalDeadline).diff(dayjs().format(), "h") < 0
                                            ?
                                            "text-red-900 text-xs font-semibold"
                                            :
                                            "text-red-500 text-xs"
                                        :
                                        "text-emerald-500 text-xs"
                                }>
                                    Deadline {dayjs(goal.goalDeadline).fromNow()}
                                </span>
                                : null
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};