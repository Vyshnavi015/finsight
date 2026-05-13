import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = {
  Food:          "#F59E0B",
  Travel:        "#3B82F6",
  Shopping:      "#EC4899",
  Entertainment: "#EF4444",
  Other:         "#10B981",
};

const COLOR_LIST = Object.values(COLORS);

function ExpenseChart({ darkMode, transactions = [] }) {

  // Aggregate spending by category from real transactions
  const categoryMap = {};
  transactions.forEach((t) => {
    const cat = t.category || "Other";
    categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(Number(t.amount));
  });

  const data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((acc, d) => acc + d.value, 0);

  const getColor = (name, index) =>
    COLORS[name] || COLOR_LIST[index % COLOR_LIST.length];

  return (
    <div
      className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        darkMode
          ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Expense Overview</h2>
        <span
          className={`text-sm px-4 py-2 rounded-xl ${
            darkMode ? "bg-white/10" : "bg-gray-100"
          }`}
        >
          All Time
        </span>
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div
          className={`text-center py-16 rounded-2xl border ${
            darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"
          }`}
        >
          No expense data yet
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
          {/* Pie */}
          <div className="w-full xl:w-[55%] h-[250px] sm:h-[300px]">
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
                    <Cell key={index} fill={getColor(entry.name, index)} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    background: darkMode ? "#111C44" : "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: darkMode ? "#fff" : "#000",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full xl:w-[45%] space-y-5">
            {data.map((item, index) => {
              const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getColor(item.name, index) }}
                    />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.value.toLocaleString()}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {pct}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;
