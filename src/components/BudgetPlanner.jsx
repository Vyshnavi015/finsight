const budgets = [
  {
    category: "Food",
    spent: 8000,
    total: 12000,
    color: "bg-orange-500",
  },
  {
    category: "Travel",
    spent: 15000,
    total: 20000,
    color: "bg-blue-500",
  },
  {
    category: "Shopping",
    spent: 6000,
    total: 10000,
    color: "bg-pink-500",
  },
];

function BudgetPlanner({ darkMode }) {
  return (
    <div
      className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1
      ${
        darkMode
          ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold">
          Budget Planner
        </h2>

        <button
          className={`text-sm transition-all duration-300
          ${
            darkMode
              ? "text-violet-400 hover:text-violet-300"
              : "text-violet-600 hover:text-violet-500"
          }`}
        >
          View Details
        </button>

      </div>

      {/* Budget Items */}
      <div className="space-y-6">

        {budgets.map((item, index) => {

          const percentage =
            (item.spent / item.total) * 100;

          return (
            <div key={index}>

              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">

                <div>

                  <h3 className="font-medium">
                    {item.category}
                  </h3>

                  <p
                    className={`text-sm mt-1
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    ₹{item.spent.toLocaleString()} spent
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    ₹{item.total.toLocaleString()}
                  </p>

                  <p
                    className={`text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {Math.round(percentage)}%
                  </p>

                </div>

              </div>

              {/* Progress Bar */}
              <div
                className={`w-full h-3 rounded-full overflow-hidden
                ${
                  darkMode
                    ? "bg-white/10"
                    : "bg-gray-200"
                }`}
              >

                <div
                  className={`${item.color} h-3 rounded-full transition-all duration-700 hover:brightness-110`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default BudgetPlanner;