'use client';

import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import { BudgetType } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingDots from "@/components/LoadingDots";
import InputError from "@/components/InputError";

export default function Page({ params }: { params: { id: string } }) {

    const { data: session } = useSession();
    if (!session) redirect('/login');

    const [newBudget, setNewBudget] = useState({
        budgetTypeId: 0,
        budgetTotal: ''
    })
    const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([]);
    const [editLoading, setEditLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(0)
    const router = useRouter();

    const userEmail = session?.user?.email;
    const encodedValue = encodeURIComponent(String(userEmail));

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

        async function fetchEditingBudget() {
            try {
                fetch(`/api/budgets/getBudgetById?email=${encodedValue}&id=${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setNewBudget({ budgetTypeId: data.data.budgetTypeId, budgetTotal: String(data.data.budgetTotal) })
                        setEditLoading(false);
                        setDeleteLoading(false);
                    })
            } catch (error) {
                console.error('Error fetching editing budget:', error);
            }
        }

        fetchBudgetTypes();
        fetchEditingBudget();
        console.log(newBudget)
    }, [])

    const updateBudget = () => {
        if (newBudget) {
            try {
                setEditLoading(true);
                fetch(`/api/budgets/editBudget?id=${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        budgetType: newBudget.budgetTypeId,
                        budgetTotal: newBudget.budgetTotal
                    })
                }).then(async (res) => {
                    const msg = await res.json();
                    setStatus(res.status);
                    setMessage(msg.message);

                    if (res.status === 201) {
                        setTimeout(() => {
                            setEditLoading(false)
                            router.push("/budgets");
                        }, 1000);
                    } else {
                        setEditLoading(false)
                    }
                });
            } catch (error) {
                console.log("Error during update of existing budget: ", error);
            }
        }
    }

    const deleteBudget = () => {
        if (newBudget) {
            try {
                setDeleteLoading(true);
                fetch(`/api/budgets/deleteBudget?id=${params.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async (res) => {
                    const msg = await res.json();
                    setStatus(res.status);
                    setMessage(msg.message);

                    if (res.status === 201) {
                        setTimeout(() => {
                            setDeleteLoading(false)
                            router.push("/budgets");
                        }, 1000);
                    } else {
                        setDeleteLoading(false)
                    }
                });
            } catch (error) {
                console.log("Error during deletion of existing budget: ", error);
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4">

                    <div className="text-2xl font-bold text-center text-gray-900 dark:text-white my-4">Update Budget</div>

                    <div className="mx-6">
                        <label htmlFor="budget_type_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a budget type</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                            value={newBudget.budgetTypeId}
                            onChange={e => setNewBudget({ ...newBudget, budgetTypeId: Number(e.target.value) })}
                        >
                            <option value={0}>Choose a budget type</option>
                            {
                                budgetTypes.map((budgetType) =>
                                (
                                    <option key={budgetType.id} value={budgetType.id}>{budgetType?.typeName}</option>
                                ))
                            }
                        </select>

                        <label htmlFor="budget_total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set a budget</label>
                        <div className="flex h-fit items-center">
                            <span className="font-bold text-gray-900 dark:text-white -ml-4 mr-2">&#8369;</span>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 bg-theme-secondary-2 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-white placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                onChange={e => setNewBudget({ ...newBudget, budgetTotal: e.target.value })}
                                value={newBudget.budgetTotal || ''}
                                min={1}
                                placeholder="Set the budget's total"
                            />
                        </div>

                        <div className="mt-4">
                            <InputError message={message} className={status === 201 ? 'text-emerald-500' : 'text-red-500'} />
                        </div>

                        <div className="flex gap-4">
                            <PrimaryButton
                                className="mt-8 mb-6 bg-neutral-600 dark:bg-neutral-800 hover:bg-neutral-800 w-5/6"
                                disabled={editLoading || deleteLoading}
                                onClick={updateBudget}
                            >
                                {
                                    editLoading ? (
                                        <div className="m-auto">
                                            <LoadingDots color="#808080" />
                                        </div>
                                    ) : (
                                        <span className="mx-auto text-gray-900 text-white">Update Budget</span>
                                    )
                                }
                            </PrimaryButton>
                            <PrimaryButton
                                className="mt-8 mb-6 bg-red-600 dark:bg-red-800 hover:bg-neutral-800 w-1/6"
                                disabled={editLoading || deleteLoading}
                                onClick={deleteBudget}
                            >
                                {
                                    deleteLoading ? (
                                        <div className="m-auto">
                                            <LoadingDots color="#808080" />
                                        </div>
                                    ) : (
                                        <div className="mx-auto">
                                            <svg width="24" height="24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 7h16"></path>
                                                <path d="M10 11v6"></path>
                                                <path d="M14 11v6"></path>
                                                <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                                <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                        </div>
                                    )
                                }
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}