import type { Expense, ExpenseType } from "../types/expense";

export interface CategoryTotal {
  category: string;
  total: number;
}

export const groupByCategory = (
  expenses: Expense[],
  type: ExpenseType,
): CategoryTotal[] => {
  const map = new Map<string, number>();

  expenses
    .filter((e) => e.type === type)
    .forEach((e) => {
      map.set(e.category, (map.get(e.category) || 0) + e.amount);
    });

  return Array.from(map.entries()).map(([category, total]) => ({
    category,
    total,
  }));
};
