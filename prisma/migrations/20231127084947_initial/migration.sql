-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "budgetTypeId" INTEGER NOT NULL,
    "goalId" UUID,
    "transactioName" TEXT NOT NULL,
    "transactionAmount" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "goalName" TEXT NOT NULL,
    "goalCurrent" INTEGER NOT NULL DEFAULT 0,
    "goalTarget" INTEGER NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "budgetTypeId" INTEGER NOT NULL,
    "budgetTotal" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "budgetCurrent" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "BudgetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "expenses" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "budgets" INTEGER NOT NULL DEFAULT 0,
    "moneySaved" INTEGER NOT NULL DEFAULT 0,
    "transactions" INTEGER NOT NULL DEFAULT 0,
    "totalBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "BudgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_budgetTypeId_fkey" FOREIGN KEY ("budgetTypeId") REFERENCES "BudgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
