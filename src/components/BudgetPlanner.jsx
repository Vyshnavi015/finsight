import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";

const CATEGORY_COLORS = {
  Food:          "bg-orange-500",
  Travel:        "bg-blue-500",
  Shopping:      "bg-pink-500",
  Entertainment: "bg-red-500",
};

const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS);

// Default budgets stored in localStorage so they persist across sessions
function loadBudgets() {
  try {
    const saved = localStorage.getItem("finsight_budgets");
    if (saved) return JSON.parse(saved);
  } catch {}
  return { Food: 12000, Travel: 20000, Shopping: 10000, Entertainment: 8000 };
}

function saveBudgets(b) {
  localStorage.setItem("finsight_budgets", JSON.stringify(b));
}

function BudgetPlanner({ darkMode, transactions = [], income = 0 }) {

  const [budgets, setBudgets] = useState(loadBudgets);
  // which category is being edited inline
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");

  // Compute spent per category from real transactions
  const spent = {};
  ALL_CATEGORIES.forEach((c) => (spent[c] = 0));
  transactions.forEach((t) => {
    const cat = t.category;
    if (cat && spent[cat] !== undefined) {
      spent[cat] += Math.abs(Number(t.amount));
    }
  });

  const totalSpent = Object.values(spent).reduce((a, b) => a + b, 0);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);

  function startEdit(cat) {
    setEditing(cat);
    setEditVal(String(budgets[cat]));
  }

  function confirmEdit(cat) {
    const val = Number(editVal);
    if (!isNaN(val) && val > 0) {
      const updated = { ...budgets, [cat]: val };
      setBudgets(updated);
      saveBudgets(updated);
    }
    setEditing(null);
  }

  const inputCls = `w-28 p-2 rounded-xl outline-none border text-sm text-right transition-all duration-200 ${
    darkMode
      ? "bg-[#0B1739] border-violet-500 text-white"
      : "bg-gray-100 border-violet-400 text-black"
  }`;

  return (
    <div
      className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        darkMode
          ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Budget Planner</h2>
        <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
          Click ✏️ to set budget
        </span>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-6 mb-6 mt-3">
        <div>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Spent</p>
          <p className="font-bold text-red-400">₹{totalSpent.toLocaleString()}</p>
        </div>
        <div>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Budget</p>
          <p className="font-bold text-violet-400">₹{totalBudget.toLocaleString()}</p>
        </div>
        {income > 0 && (
          <div>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Income</p>
            <p className="font-bold text-green-400">₹{income.toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Budget Items */}
      <div className="space-y-6">
        {ALL_CATEGORIES.map((cat) => {
          const spentAmt = spent[cat] || 0;
          const budgetAmt = budgets[cat] || 0;
          const pct = budgetAmt > 0 ? Math.min((spentAmt / budgetAmt) * 100, 100) : 0;
          const isOver = spentAmt > budgetAmt && budgetAmt > 0;

          return (
            <div key={cat}>
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{cat}</h3>
                  <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    ₹{spentAmt.toLocaleString()} spent
                    {isOver && (
                      <span className="ml-2 text-red-400 font-semibold">Over budget!</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {editing === cat ? (
                    <>
                      <input
                        type="number"
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && confirmEdit(cat)}
                        className={inputCls}
                        autoFocus
                      />
                      <button
                        onClick={() => confirmEdit(cat)}
                        className="p-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-all"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className={`p-1.5 rounded-lg transition-all ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-semibold">₹{budgetAmt.toLocaleString()}</p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {Math.round(pct)}%
                        </p>
                      </div>
                      <button
                        onClick={() => startEdit(cat)}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          darkMode
                            ? "text-gray-400 hover:text-violet-400 hover:bg-violet-500/10"
                            : "text-gray-400 hover:text-violet-600 hover:bg-violet-50"
                        }`}
                        title="Edit budget"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                <div
                  className={`${isOver ? "bg-red-500" : CATEGORY_COLORS[cat]} h-3 rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
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
