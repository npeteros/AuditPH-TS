export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    income: number,
    expenses: number,
    goals: number,
    budgets: number,
    money_saved: number,
    transactions: number,
    total_balance: number
};

export type BudgetType = {
    id: number,
    name: string,
    color: string
};

export type Budget = {
    id: string,
    user_id: string,
    budget_type_id: number,
    budget_total: number,
    budget_current: number
};

export type Goals = {
    id: string,
    user_id: string,
    name: string,
    current: number,
    target: number
};

export type Transactions = {
    id: string,
    user_id: string,
    budget_type_id: number,
    goal_id: string,
    name: string,
    amount: number
};