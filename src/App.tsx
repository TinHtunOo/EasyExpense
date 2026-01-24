import { useEffect, useState } from "react";
import type { Expense } from "./types/expense";
import { getExpenses, saveExpenses } from "./utils/storage";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summery";
import CategoryFilter from "./components/CategoryFilter";
import CategoryChart from "./components/CategotyChart";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => getExpenses());
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
    setIsModalOpen(false);
  };
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses =
    category === "All"
      ? expenses
      : expenses.filter((e) => e.category === category);

  return (
    <div className="min-h-screen max-w-5xl mx-auto bg-gray-100 p-6">
      {isModalOpen && (
        <>
          <div className="absolute h-screen w-screen top-0 left-0 bg-black opacity-50"></div>
          <div className="relative bg-white w-2xl left-0 right-0 m-auto p-12">
            <h2 className="text-xl font-bold">Add Transaction</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <ExpenseForm onAdd={addExpense} />
          </div>
        </>
      )}
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Add Transaction
      </button>
      <Summary expenses={expenses} />
      <CategoryChart expenses={expenses} />
      <CategoryFilter
        categories={[...new Set(expenses.map((e) => e.category))]}
        selected={category}
        onChange={setCategory}
      />{" "}
      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
    </div>
  );
}
