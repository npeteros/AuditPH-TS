'use client';

import InputError from "@/components/InputError";
import LoadingDots from "@/components/LoadingDots";
import PrimaryButton from "@/components/PrimaryButton";
import { BudgetType, Goal } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {


    const { data: session } = useSession();
    if (!session) redirect('/login');

    const [newTransaction, setNewTransaction] = useState({
        transactionName: '',
        transactionType: 'EXPENSE',
        budgetTypeId: 0,
        goalId: '',
        transactionAmount: ''
    });
    const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userEmail = session?.user?.email
        const encodedValue = encodeURIComponent(String(userEmail));
        async function fetchBudgetTypes() {
            try {
                fetch(`/api/transactionData?email=${encodedValue}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setBudgetTypes(data.budgetTypes)
                        setGoals(data.goals)
                    })
            } catch (error) {
                console.error('Error fetching Transaction Data:', error);
            }
        }

        fetchBudgetTypes()
    }, [])

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newTransaction) {
            try {
                setLoading(true);
                fetch('/api/newTransaction', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        transactionName: newTransaction.transactionName,
                        budgetTypeId: newTransaction.budgetTypeId,
                        goalId: newTransaction.goalId,
                        transactionAmount: newTransaction.transactionAmount,
                        transactionType: newTransaction.transactionType
                    })
                }).then(async (res) => {
                    const msg = await res.json();
                    setStatus(res.status);
                    setMessage(msg.message);

                    if (res.status === 201) {
                        setTimeout(() => {
                            setLoading(false);
                            router.push("/transactions");
                        }, 2000);
                    } else {
                        setLoading(false)
                    }
                });
            } catch (error) {
                console.log("Error during creation of new budget: ", error);
            }
        }
    }

    return (

        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <form onSubmit={submit}>
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4">

                    <div className="text-lg font-bold text-center text-gray-900 dark:text-white mb-4">Create a Transaction</div>

                    <div className="mx-6">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set transaction name <span className="dark:text-red-500 font-normal">*</span></label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                                    type="text"
                                    onChange={e => setNewTransaction({ ...newTransaction, transactionName: e.target.value })}
                                    value={newTransaction.transactionName}
                                    placeholder="Set the transaction's name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set transaction type <span className="dark:text-red-500 font-normal">*</span></label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                                    value={newTransaction.transactionType}
                                    onChange={e => setNewTransaction({ ...newTransaction, transactionType: e.target.value })}
                                    required
                                >
                                    <option defaultValue="EXPENSE">Expense</option>
                                    <option value="INCOME">Income</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="budget_type_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an expense</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                                    value={newTransaction.budgetTypeId}
                                    onChange={e => setNewTransaction({ ...newTransaction, budgetTypeId: Number(e.target.value) })}
                                >
                                    <option defaultValue={0}>Choose an expense (optional)</option>
                                    {
                                        budgetTypes.map((budgetType) =>
                                        (
                                            <option key={budgetType.id} value={budgetType.id}>{budgetType.typeName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="budget_type_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select aligned goal</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                                    value={newTransaction.goalId}
                                    onChange={e => setNewTransaction({ ...newTransaction, goalId: e.target.value })}
                                >
                                    <option defaultValue={0}>Choose a goal (optional)</option>
                                    {
                                        goals.map(goal => (
                                            <option key={goal.id} value={goal.id}>
                                                {goal.goalName}
                                            </option>
                                        ))

                                    }
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="budget_total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set the transaction&apos;s amount <span className="dark:text-red-500 font-normal">*</span></label>
                                <div className="flex h-fit items-center">
                                    <span className="font-bold text-gray-900 dark:text-white -ml-4 mr-2">&#8369;</span>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        onChange={e => setNewTransaction({ ...newTransaction, transactionAmount: e.target.value })}
                                        value={newTransaction.transactionAmount || ''}
                                        min={1}
                                        placeholder="Set the transaction's amount"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-4 col-span-2">
                                <InputError message={message} className={status === 201 ? 'text-emerald-500' : 'text-red-500'} />
                            </div>

                            <PrimaryButton
                                disabled={loading}
                                className="mt-8 mb-6 bg-neutral-600 dark:bg-neutral-800 hover:bg-neutral-800 w-full col-span-2"
                            >
                                {
                                    loading ? (
                                        <div className="m-auto">
                                            <LoadingDots color="#808080" />
                                        </div>
                                    ) : (
                                        <span className="mx-auto text-gray-900 text-white">Create Transaction</span>
                                    )
                                }
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}