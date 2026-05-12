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

function BudgetPlanner() {
  return (
    <div className="bg-gradient-to-br from-[#111C44] to-[#0B1739] border border-white/10 rounded-2xl shadow-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Budget Planner
      </h2>

      <div className="space-y-6">

        {budgets.map((item, index) => {
          const percentage =
            (item.spent / item.total) * 100;

          return (
            <div key={index}>

              <div className="flex justify-between mb-2">

                <h3 className="font-medium">
                  {item.category}
                </h3>

                <p className="text-gray-400 text-sm">
                  ₹{item.spent} / ₹{item.total}
                </p>

              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

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