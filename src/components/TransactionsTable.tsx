import { auth } from "@/lib/auth";
import { fetchFilteredTransactions, fetchTransactions } from "@/lib/data";
import { redirect } from "next/navigation";
import dayjs from 'dayjs';
import DivLink from "./DivLink"

export default async function TransactionsTable({ query }: { query: string }) {
    const session = await auth();
    if (!session) return redirect('/login');
    const transactions = await fetchFilteredTransactions(String(session?.user?.email), query);
    console.log(transactions)
    return (
        <div className="inline-block min-w-full align-middle mt-6">
            <div className="rounded-lg bg-neutral-700 p-2 md:pt-0">
                <div className="md:hidden">
                    {
                        transactions?.map((t) => (
                            <div
                                key={t.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{dayjs(t.createdAt.toISOString()).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="w-36">
                                            <p className="text-sm text-gray-500">{t.transactionName}</p>
                                        </div>
                                    </div>
                                    {t.budgetType?.typeName ? t.budgetType?.typeName : 'N/A'}
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            &#8369; {t.transactionAmount.toLocaleString()}
                                        </p>
                                        <p className={t.transactionType === 'EXPENSE' ? 'text-red-500' : 'text-emerald-500'}>{t.transactionType}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <DivLink
                                            route="/"
                                            className="rounded-md border p-2 hover:bg-gray-100"
                                        >
                                            <svg width="29" height="29" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z"></path>
                                                <path d="m13.5 6.5 4 4"></path>
                                            </svg>
                                        </DivLink>
                                        <DivLink
                                            route="/"
                                            className="rounded-md border p-2 hover:bg-gray-100"
                                        >
                                            <svg width="29" height="29" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 7h16"></path>
                                                <path d="M10 11v6"></path>
                                                <path d="M14 11v6"></path>
                                                <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                                <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                        </DivLink>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <table className="hidden md:table min-w-full text-white">
                    <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th className="px-4 py-5 font-medium sm:pl-6">
                                Date
                            </th>
                            <th className="px-3 py-5 font-medium">
                                Budget
                            </th>
                            <th className="px-3 py-5 font-medium">
                                Description
                            </th>
                            <th className="px-3 py-5 font-medium">
                                Type
                            </th>
                            <th className="px-3 py-5 font-medium">
                                Amount
                            </th>
                            <th className="px-3 py-5 font-medium flex justify-center">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-900">
                        {
                            transactions?.map((t) => (
                                <tr
                                    key={t.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="py-3 pl-6 pr-3">
                                        <p>{dayjs(t.createdAt.toISOString()).format('DD/MM/YYYY')}</p>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className="font-medium">{t.budgetType?.typeName ? t.budgetType?.typeName : 'N/A'}</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span>{t.transactionName}</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={t.transactionType === 'EXPENSE' ? 'text-red-500' : 'text-emerald-500'}>{t.transactionType}</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        &#8369; {t.transactionAmount.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-3">
                                        <div className="flex justify-center gap-3">
                                            <DivLink
                                                route="/"
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <svg width="29" height="29" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4Z"></path>
                                                    <path d="m13.5 6.5 4 4"></path>
                                                </svg>
                                            </DivLink>
                                            <DivLink
                                                route="/"
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                            >
                                                <svg width="29" height="29" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 7h16"></path>
                                                    <path d="M10 11v6"></path>
                                                    <path d="M14 11v6"></path>
                                                    <path d="m5 7 1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                                                    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                                                </svg>
                                            </DivLink>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};