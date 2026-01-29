import { Trash2 } from "lucide-react";
import type { Expense } from "../types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">No transactions yet</div>
    );
  }

  const incomes = expenses.filter((expense) => expense.type === "income");
  const expenseItems = expenses.filter((expense) => expense.type === "expense");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-indigo-200 p-4">
          <h3 className="text-base  font-medium mb-4 ">Expenses</h3>
          <ul className="divide-y ">
            {expenseItems.map((expense) => (
              <li
                key={expense.id}
                className="grid grid-cols-3 sm:grid-cols-4   py-4 "
              >
                <p className="text-sm my-auto  text-gray-500 hidden sm:block">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <div className="flex items-center">
                  <p className="font-medium ">{expense.title}</p>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <p>{expense.category}</p>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <span className="text-red-600 font-medium">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-sm hover:cursor-pointer text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
            {expenseItems.length === 0 && (
              <li className="text-center text-gray-500 py-6">
                No expenses yet
              </li>
            )}
          </ul>
        </div>

        <div className="bg-white border border-indigo-200 rounded-lg  p-4">
          <h3 className="text-base  font-medium mb-4 ">Income</h3>
          <ul className="divide-y">
            {incomes.map((expense) => (
              <li
                key={expense.id}
                className="grid grid-cols-3 sm:grid-cols-4   py-4 "
              >
                <p className="text-sm my-auto text-gray-500 hidden sm:block">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <div className="flex items-center">
                  <p className="font-medium ">{expense.title}</p>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <p>{expense.category}</p>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <span className="text-green-600 font-medium">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-sm hover:cursor-pointer text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
            {incomes.length === 0 && (
              <li className="text-center text-gray-500 py-6">No income yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
