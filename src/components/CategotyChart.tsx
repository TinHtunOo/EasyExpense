import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import type { Expense, ExpenseType } from "../types/expense";
import { groupByCategory } from "../utils/groupByCategory";
import { useIsMobile } from "../hooks/useMobile";
import { CATEGORY_COLORS, DEFAULT_COLOR } from "../constants/categoryColors";

interface Props {
  expenses: Expense[];
}

export default function CategoryChart({ expenses }: Props) {
  const [type, setType] = useState<ExpenseType>("expense");
  const isMobile = useIsMobile();

  const data = useMemo(() => {
    const grouped = groupByCategory(expenses, type);
    const total = grouped.reduce((sum, g) => sum + g.total, 0);

    return grouped.map((g) => ({
      ...g,
      percent: total === 0 ? 0 : (g.total / total) * 100,
    }));
  }, [expenses, type]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">
          {type === "expense" ? "Expenses" : "Income"} by Category
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setType("expense")}
            className={`px-3 py-1 rounded text-sm ${
              type === "expense" ? "bg-red-500 text-white" : "bg-gray-100"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setType("income")}
            className={`px-3 py-1 rounded text-sm ${
              type === "income" ? "bg-green-500 text-white" : "bg-gray-100"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No {type} data available
        </p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={
                  isMobile
                    ? false
                    : ({ category, percent }) =>
                        `${category} (${percent.toFixed(1)}%)`
                }
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={CATEGORY_COLORS[entry.category] || DEFAULT_COLOR}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: number, _name, props: any) => [
                  `$${value.toFixed(2)} (${props.payload.percent.toFixed(1)}%)`,
                  props.payload.category,
                ]}
              />

              <Legend
                formatter={(value: string, entry: any) =>
                  `${value} (${entry.payload.percent.toFixed(1)}%)`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
