import { useEffect, useState } from "react";
import type { Expense } from "./types/expense";
import { getExpenses, saveExpenses } from "./utils/storage";
import ExpenseForm from "./components/ExpenseForm";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      {/* Summary */}
      {/* ExpenseList */}
    </div>
  );
}
