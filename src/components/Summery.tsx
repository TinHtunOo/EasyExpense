import { Banknote, BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
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
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 gap-2 mb-6">
      <div className="bg-white border border-indigo-200 sm:p-4 p-2 rounded-lg  flex items-center gap-5">
        <span className="text-green-400">
          <BanknoteArrowDown size={30} />
        </span>
        <div>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-2xl font-medium ">${income.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white border border-indigo-200 sm:p-4 p-2 rounded-lg  flex items-center gap-5">
        <span className="text-red-400">
          <BanknoteArrowUp size={30} />
        </span>
        <div>
          <p className="text-sm text-gray-500">Expense</p>
          <p className="text-2xl font-medium ">${expense.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white border border-indigo-200 sm:p-4 p-2 rounded-lg  flex items-center gap-5">
        <span className="text-blue-400">
          <Banknote size={30} />
        </span>
        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-2xl font-medium ">${balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
