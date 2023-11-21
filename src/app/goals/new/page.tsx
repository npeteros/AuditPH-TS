'use client';

import PrimaryButton from "@/components/PrimaryButton";
import { useState } from "react";

export default function Page() {

    const [goal, setGoal] = useState("");
    const [target, setTarget] = useState(0)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                            onChange={e => setGoal(e.target.value)}
                            value={goal}
                            placeholder="Set the goal's name"
                        />
                        <label htmlFor="goal_total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set a target</label>
                        <div className="flex h-fit items-center">
                            <span className="font-bold text-gray-900 dark:text-white -ml-4 mr-2">&#36;</span>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                onChange={e => setTarget(Number(e.target.value))}
                                value={target}
                                placeholder="Set the goal's total"
                                min={1}
                            />
                        </div>

                        <PrimaryButton
                            disabled={false}
                            className="mt-8 mb-6 bg-neutral-600 dark:bg-neutral-800 hover:bg-neutral-800 w-full"
                        >
                            <span className="mx-auto text-gray-900 text-white">Create Goal</span>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>


    );
}