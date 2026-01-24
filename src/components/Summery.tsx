import type { Expense } from "../types/expense";

interface SummaryProps {
  expenses: Expense[];
}

export default function Summary({ expenses }: SummaryProps) {
  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Income</p>
        <p className="text-xl font-bold text-green-600">${income.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Expense</p>
        <p className="text-xl font-bold text-red-600">${expense.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">Balance</p>
        <p
          className={`text-xl font-bold ${
            balance >= 0 ? "text-blue-600" : "text-red-600"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
