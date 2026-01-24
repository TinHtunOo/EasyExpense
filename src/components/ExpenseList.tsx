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

  return (
    <div className="bg-white rounded-lg shadow">
      <ul className="divide-y">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex items-center justify-between p-4"
          >
            <div>
              <p className="font-medium">{expense.title}</p>
              <p className="text-sm text-gray-500">
                {expense.category} •{" "}
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={
                  expense.type === "income"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {expense.type === "income" ? "+" : "-"}$
                {expense.amount.toFixed(2)}
              </span>

              <button
                onClick={() => onDelete(expense.id)}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
