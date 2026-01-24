import type { Expense } from "../types/expense";

const KEY = "expenses";

export const getExpenses = (): Expense[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveExpenses = (expenses: Expense[]) =>
  localStorage.setItem(KEY, JSON.stringify(expenses));
