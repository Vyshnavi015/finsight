import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  Food: "#F59E0B", Travel: "#3B82F6", Shopping: "#EC4899",
  Entertainment: "#EF4444", Other: "#10B981",
};
const COLOR_LIST = Object.values(COLORS);

function ExpenseChart({ darkMode, transactions = [] }) {
  const categoryMap = {};
  transactions.forEach((t) => {
    const cat = t.category || "Other";
    categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(Number(t.amount));
  });

  const data  = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const getColor = (name, i) => COLORS[name] || COLOR_LIST[i % COLOR_LIST.length];

  return (
    <div
      className="rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Expense Overview</h2>
        <span className="text-sm px-4 py-2 rounded-xl" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>
          All Time
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border theme-muted" style={{ borderColor: "var(--border)" }}>
          No expense data yet
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
          <div className="w-full xl:w-[55%] h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                  {data.map((entry, i) => <Cell key={i} fill={getColor(entry.name, i)} />)}
                </Pie>
                <Tooltip
                  formatter={(v) => [`₹${v.toLocaleString()}`, ""]}
                  contentStyle={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full xl:w-[45%] space-y-5">
            {data.map((item, i) => {
              const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              return (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getColor(item.name, i) }} />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.value.toLocaleString()}</p>
                    <p className="text-sm theme-muted">{pct}%</p>
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
