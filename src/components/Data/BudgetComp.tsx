import { Budget, BudgetType } from '@prisma/client';
import DynamicComponentRenderer from './lib/DynamicComponentRenderer';
import prisma from '@/lib/prisma';

export default function BudgetComp({ budget, budgetType }: { budget: Budget, budgetType: BudgetType }) {


    return (
        <div className="my-3 bg-white shadow-sm rounded-3xl p-6">
            <div className="flex">
                <div className='rounded-full w-fit p-3 mr-3' style={{ backgroundColor: budgetType?.color }}>
                    <DynamicComponentRenderer componentName={budgetType?.typeName} />
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-start">
                            <span className="text-base font-medium text-black">
                                {budgetType?.typeName}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-black">
                            &#8369; {Number(budget.budgetCurrent).toLocaleString()} / {Number(budget.budgetTotal).toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
                            <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${(budget.budgetCurrent / budget.budgetTotal) * 100}%` }} />
                        </div>
                        <span className="text-sm font-medium text-black">
                            {
                                parseFloat(String((budget.budgetCurrent / budget.budgetTotal) * 100)).toFixed()
                            } % 
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}