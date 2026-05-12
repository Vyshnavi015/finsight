import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
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

function ExpenseChart({ darkMode }) {
  return (
    <div
      className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1
      ${
        darkMode
          ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold">
          Expense Overview
        </h2>

        <button
          className={`text-sm px-4 py-2 rounded-xl transition-all duration-300
          ${
            darkMode
              ? "bg-white/10 hover:bg-white/20"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          This Month
        </button>

      </div>

      {/* Chart + Legends */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-8">

        {/* Chart */}
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
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Legends */}
        <div className="w-full xl:w-[45%] space-y-5">

          {data.map((item, index) => {

            const total = data.reduce(
              (acc, curr) => acc + curr.value,
              0
            );

            const percentage = (
              (item.value / total) *
              100
            ).toFixed(1);

            return (
              <div
                key={index}
                className="flex items-center justify-between"
              >

                {/* Left */}
                <div className="flex items-center gap-3">

                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index],
                    }}
                  />

                  <p className="font-medium">
                    {item.name}
                  </p>

                </div>

                {/* Right */}
                <div className="text-right">

                  <p className="font-semibold">
                    ₹{item.value.toLocaleString()}
                  </p>

                  <p
                    className={`text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {percentage}%
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default ExpenseChart;