export type ExpenseType = "income" | "expense";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  type: ExpenseType;
  category: string;
  date: string;
}
