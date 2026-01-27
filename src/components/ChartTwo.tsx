import { useMemo, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts";
import type { Expense, ExpenseType } from "../types/expense";
import { groupByCategory } from "../utils/groupByCategory";
import { CATEGORY_COLORS, DEFAULT_COLOR } from "../constants/categoryColors";

interface Props {
  expenses: Expense[];
}

export default function ChartTwo({ expenses }: Props) {
  const [type, setType] = useState<ExpenseType>("income");

  const data = useMemo(() => {
    const grouped = groupByCategory(expenses, type);
    const total = grouped.reduce((sum, g) => sum + g.total, 0);

    return grouped.map((g) => ({
      ...g,
      percent: total === 0 ? 0 : (g.total / total) * 100,
    }));
  }, [expenses, type]);

  return (
    <div className=" flex-1 rounded-lg  mb-6 hidden sm:block ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">
          {type === "expense" ? "Expenses" : "Income"}
        </h2>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No {type} data available
        </p>
      ) : (
        <div className="h-60 text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="100"
                innerRadius={40}
                outerRadius={70}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={CATEGORY_COLORS[entry.category] || DEFAULT_COLOR}
                  />
                ))}
              </Pie>

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
