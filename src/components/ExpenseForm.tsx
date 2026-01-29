import { useState } from "react";
import type { Expense, ExpenseType } from "../types/expense";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Salary",
  "Other",
];

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<ExpenseType>("expense");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString(),
    };

    onAdd(newExpense);

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-white space-y-4 mt-5 ">
      <div className="flex justify-center items-center ">
        {/* <label className="block text-lg font-medium min-w-30">Title:</label> */}
        <input
          type="text"
          className="w-full bg-gray-100 rounded px-3 py-2 outline-0 focus:bg-gray-50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title "
        />
      </div>

      <div className="flex justify-center items-center ">
        {/* <label className="block text-lg font-medium min-w-30">Amount:</label> */}
        <input
          type="number"
          className="w-full bg-gray-100 rounded px-3 py-2 outline-0 focus:bg-gray-50"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the amount"
        />
      </div>

      <div className="flex justify-end flex-wrap gap-4">
        <div className=" flex items-center gap-1">
          <label className="block text-sm font-medium ">Type:</label>
          <select
            className=" rounded p-2 bg-gray-100 text-sm text-gray-500 outline-0"
            value={type}
            onChange={(e) => setType(e.target.value as ExpenseType)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <label className="block text-sm font-medium">Category:</label>
          <select
            className="rounded p-2 bg-gray-100 text-sm text-gray-500 outline-0"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full border-b border-gray-400"></div>
      <div className="text-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
