'use client';

import InputError from "@/components/InputError";
import LoadingDots from "@/components/LoadingDots";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const today = new Date();
    today.setDate(today.getDate() + 2)

    const [newGoal, setNewGoal] = useState({
        goalName: '',
        goalTarget: '',
        goalDeadline: today.toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(0);
    const router = useRouter();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newGoal) {
            try {
                setLoading(true);
                fetch('/api/newGoal', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        goalName: newGoal.goalName,
                        goalTarget: newGoal.goalTarget,
                        goalDeadline: newGoal.goalDeadline
                    })
                }).then(async (res) => {
                    const msg = await res.json();
                    setStatus(res.status);
                    setMessage(msg.message);

                    if (res.status === 201) {
                        setTimeout(() => {
                            setLoading(false)
                            router.push("/goals");
                        }, 2000);
                    } else {
                        setLoading(false)
                    }
                });
            } catch (error) {
                console.log("Error during creation of new goal: ", error);
            }
        }
    }

    return (

        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <form onSubmit={submit}>
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4">

                    <div className="text-lg font-bold text-center text-gray-900 dark:text-white mb-4">Create a Goal</div>

                    <div className="mx-6">
                        <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set your goal</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                            type="text"
                            onChange={e => setNewGoal({ ...newGoal, goalName: e.target.value })}
                            value={newGoal.goalName}
                            placeholder="Set the goal's name"
                            required
                        />

                        <label htmlFor="goal_deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set a deadline</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                            type="date"
                            onChange={e => setNewGoal({ ...newGoal, goalDeadline: e.target.value })}
                            value={newGoal.goalDeadline}
                            placeholder="Set the goal's total"
                            min={1}
                            required
                        />

                        <label htmlFor="goal_total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set a target</label>
                        <div className="flex h-fit items-center">
                            <span className="font-bold text-gray-900 dark:text-white -ml-4 mr-2">&#8369;</span>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                onChange={e => setNewGoal({ ...newGoal, goalTarget: e.target.value })}
                                value={newGoal.goalTarget || ''}
                                placeholder="Set the goal's total"
                                min={1}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <InputError message={message} className={status === 201 ? 'text-emerald-500' : 'text-red-500'} />
                        </div>

                        <PrimaryButton
                            className="mt-8 mb-6 bg-neutral-600 dark:bg-neutral-800 hover:bg-neutral-800 w-full"
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <div className="m-auto">
                                        <LoadingDots color="#808080" />
                                    </div>
                                ) : (
                                    <span className="mx-auto text-gray-900 text-white">Create Goal</span>
                                )
                            }
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>


    );
}