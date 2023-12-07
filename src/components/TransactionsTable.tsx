import { auth } from "@/lib/auth";
import { fetchFilteredTransactions, fetchTransactions } from "@/lib/data";
import { redirect } from "next/navigation";
import dayjs from 'dayjs';
import DivLink from "./DivLink"

export default async function TransactionsTable({ query }: { query: string }) {
    const session = await auth();
    if (!session) return redirect('/login');
    const transactions = await fetchFilteredTransactions(String(session?.user?.email), query);
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
                                            <p>{dayjs(t.createdAt.toISOString()).format('YYYY-MM-DD')}</p>
                                        </div>
                                        <div className="w-36">
                                            <p className="text-sm text-gray-500">{t.transactionName}</p>
                                        </div>
                                    </div>
                                    {t.typename ? t.typename : 'N/A'}
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            &#8369; {t.transactionAmount.toLocaleString()}
                                        </p>
                                        <p className={t.transactionType === 'EXPENSE' ? 'text-red-500' : 'text-emerald-500'}>{t.transactionType}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <table className="hidden md:table pb-6 w-full text-white">
                    <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th className="px-3 py-5 font-medium">
                                Date
                            </th>

                            <th className="px-3 py-5 font-medium">
                                Budget
                            </th>

                            <th className="px-3 py-5 font-medium">
                                Description
                            </th>

                            <th className="px-3 py-5 font-medium">
                                Type (Income/Expenses)
                            </th>

                            <th className="px-3 py-5 font-medium">
                                Amount
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
                                        <p>{dayjs(t.createdAt.toISOString()).format('YYYY-MM-DD')}</p>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className="font-medium">{t.typename ? t.typename : 'N/A'}</span>
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};