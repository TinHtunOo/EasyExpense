interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-medium">Transactions</h3>
      <select
        className="p-2 border rounded border-indigo-200 text-sm text-gray-500"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
