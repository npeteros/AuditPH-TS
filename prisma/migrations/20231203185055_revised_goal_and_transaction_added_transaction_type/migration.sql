/*
  Warnings:

  - You are about to drop the column `transactioName` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transactionName` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_budgetTypeId_fkey";

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "goalDeadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactioName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionName" TEXT NOT NULL,
ADD COLUMN     "transactionType" "TransactionType" NOT NULL DEFAULT 'EXPENSE',
ALTER COLUMN "budgetTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "BudgetType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
