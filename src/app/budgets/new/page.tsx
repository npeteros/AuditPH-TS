'use client';

import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import { BudgetType } from "@prisma/client";

export default function Page() {

    const [budgetTypeId, setBudgetTypeId] = useState(0);
    const [budgetTotal, setBudgetTotal] = useState(0);
    const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([]);

    useEffect(() => {
        async function fetchBudgetTypes() {
            try {
                fetch('/api/budgetTypes')
                    .then(res => res.json())
                    .then(data => setBudgetTypes(data))
            } catch (error) {
                console.error('Error fetching BudgetTypes:', error);
            }
        }

        fetchBudgetTypes()
    }, [])



    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <form onSubmit={submit}>
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4">

                    <div className="text-lg font-bold text-center text-gray-900 dark:text-white mb-4">Create a Budget</div>

                    <div className="mx-6">
                        <label htmlFor="budget_type_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an expense</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                            value={budgetTypeId}
                            onChange={e => setBudgetTypeId(Number(e.target.value))}
                        >
                            <option value={0}>Choose an expense</option>
                            {
                                budgetTypes.map((budgetType) =>
                                (
                                    <option key={budgetType.id} value={budgetType.id}>{budgetType?.typeName}</option>
                                ))
                            }
                        </select>

                        <label htmlFor="budget_total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set a budget</label>
                        <div className="flex h-fit items-center">
                            <span className="font-bold text-gray-900 dark:text-white -ml-4 mr-2">&#36;</span>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                onChange={e => setBudgetTotal(Number(e.target.value))}
                                value={budgetTotal}
                                min={1}
                                placeholder="Set the budget's total"
                            />
                        </div>

                        <PrimaryButton
                            className="mt-8 mb-6 bg-neutral-600 dark:bg-neutral-800 hover:bg-neutral-800 w-full"
                            disabled={false}
                        >
                            <span className="mx-auto text-gray-900 text-white">Create Budget</span>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
}