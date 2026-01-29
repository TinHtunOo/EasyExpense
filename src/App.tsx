import { useEffect, useState } from "react";
import type { Expense } from "./types/expense";
import { getExpenses, saveExpenses } from "./utils/storage";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summery";
import CategoryFilter from "./components/CategoryFilter";
import CategoryChart from "./components/CategotyChart";
import ChartTwo from "./components/ChartTwo";
import { Plus, X } from "lucide-react";

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
    <div className={` ${isModalOpen ? "overflow-hidden h-screen" : ""}`}>
      {isModalOpen ? (
        <div>
          <div className="absolute top-0 right-0 h-screen w-screen z-20 bg-black/50"></div>
          <div className="absolute top-20 right-0 left-0 m-auto max-w-lg bg-white sm:rounded-2xl   p-4 z-21">
            <h3 className="text-base">New Transaction</h3>
            <button
              className="absolute top-4 right-4 text-red-600 hover:cursor-pointer hover:text-red-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>

            <ExpenseForm onAdd={addExpense} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className=" bg-gray-50 min-h-screen max-w-5xl  overflow-x-hidden mx-auto  sm:p-6 p-2 ">
        <div className="flex justify-between items-center pt-2 px-2 sm:p-0 mb-5">
          <h1 className="text-2xl font-bold">EasyExpense</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600  hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <span className="hidden sm:block"> Add Transaction</span>
            <span className="block sm:hidden">
              {" "}
              <Plus />{" "}
            </span>
          </button>
        </div>
        <div className=" flex sm:flex-col flex-col-reverse">
          <Summary expenses={expenses} />
          <div className="flex gap-5 items-center justify-between">
            <CategoryChart expenses={expenses} />
            <ChartTwo expenses={expenses} />
          </div>
        </div>
        <CategoryFilter
          categories={[...new Set(expenses.map((e) => e.category))]}
          selected={category}
          onChange={setCategory}
        />{" "}
        <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}
