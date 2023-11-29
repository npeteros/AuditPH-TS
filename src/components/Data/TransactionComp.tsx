import { BudgetType, Transaction } from '@prisma/client';
import DynamicComponentRenderer from './lib/DynamicComponentRenderer';

export default function TransactionComp({ transaction, budgetType }: { transaction: Transaction, budgetType: BudgetType }) {

    const date = new Date(transaction.createdAt);

    return (
        <div className="my-3 bg-white shadow-sm rounded-3xl p-6">
            <div className="flex">
                <div className="rounded-full w-fit p-3 mr-3" style={{ backgroundColor: budgetType.color }}>
                    <DynamicComponentRenderer componentName={budgetType.typeName} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-start">
                            <span className="text-base font-medium text-black font-extrabold my-1">
                                {transaction.transactionName}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-black font-extrabold my-1">
                            -&#36; {transaction.transactionAmount}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-base font-light text-black">
                            {budgetType.typeName}
                        </span>
                        <span className="text-sm font-light text-black">
                            {date.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}