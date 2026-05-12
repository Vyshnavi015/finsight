import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 10000 },
  { name: "Travel", value: 7000 },
  { name: "Shopping", value: 6000 },
  { name: "Bills", value: 4000 },
];

const COLORS = [
  "#EF4444",
  "#3B82F6",
  "#F59E0B",
  "#10B981",
];

function ExpenseChart() {
  return (
    <div className="bg-[#111C44] p-6 rounded-2xl border border-white/10 shadow-xl">
      
      <h2 className="text-xl font-semibold mb-6">
        Expense Overview
      </h2>

      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ExpenseChart;