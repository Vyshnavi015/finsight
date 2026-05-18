import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";

const CATEGORY_HEX = {
  Food: "#F97316", Travel: "#3B82F6", Shopping: "#EC4899", Entertainment: "#EF4444",
};
const ALL_CATEGORIES = Object.keys(CATEGORY_HEX);

function loadBudgets() {
  try { const s = localStorage.getItem("finsight_budgets"); if (s) return JSON.parse(s); } catch {}
  return { Food: 12000, Travel: 20000, Shopping: 10000, Entertainment: 8000 };
}
function saveBudgets(b) { localStorage.setItem("finsight_budgets", JSON.stringify(b)); }

function BudgetPlanner({ darkMode, transactions = [], income = 0 }) {
  const [budgets, setBudgets] = useState(loadBudgets);
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");

  const spent = {};
  ALL_CATEGORIES.forEach((c) => (spent[c] = 0));
  transactions.forEach((t) => {
    if (t.category && spent[t.category] !== undefined)
      spent[t.category] += Math.abs(Number(t.amount));
  });

  const totalSpent  = Object.values(spent).reduce((a, b) => a + b, 0);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);

  function confirmEdit(cat) {
    const val = Number(editVal);
    if (!isNaN(val) && val > 0) { const u = { ...budgets, [cat]: val }; setBudgets(u); saveBudgets(u); }
    setEditing(null);
  }

  return (
    <div
      className="rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Budget Planner</h2>
        <span className="text-xs px-3 py-1 rounded-full theme-muted" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>
          Click ✏️ to set budget
        </span>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-6 mb-6 mt-3">
        <div>
          <p className="text-xs theme-muted">Total Spent</p>
          <p className="font-bold text-red-400">₹{totalSpent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs theme-muted">Total Budget</p>
          <p className="font-bold" style={{ color: "var(--accent)" }}>₹{totalBudget.toLocaleString()}</p>
        </div>
        {income > 0 && (
          <div>
            <p className="text-xs theme-muted">Income</p>
            <p className="font-bold text-green-400">₹{income.toLocaleString()}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-6">
        {ALL_CATEGORIES.map((cat) => {
          const spentAmt  = spent[cat]   || 0;
          const budgetAmt = budgets[cat] || 0;
          const pct       = budgetAmt > 0 ? Math.min((spentAmt / budgetAmt) * 100, 100) : 0;
          const isOver    = spentAmt > budgetAmt && budgetAmt > 0;
          const barColor  = isOver ? "#EF4444" : CATEGORY_HEX[cat];

          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">{cat}</h3>
                  <p className="text-sm mt-1 theme-muted">
                    ₹{spentAmt.toLocaleString()} spent
                    {isOver && <span className="ml-2 text-red-400 font-semibold">Over budget!</span>}
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
                        autoFocus
                        className="w-28 p-2 rounded-xl outline-none border text-sm text-right"
                        style={{ background: "var(--bg-input)", borderColor: "var(--accent)", color: "var(--text-primary)" }}
                      />
                      <button onClick={() => confirmEdit(cat)} className="p-1.5 rounded-lg text-white transition-all" style={{ background: "var(--accent)" }}>
                        <Check size={14} />
                      </button>
                      <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg transition-all theme-muted">
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-semibold">₹{budgetAmt.toLocaleString()}</p>
                        <p className="text-sm theme-muted">{Math.round(pct)}%</p>
                      </div>
                      <button
                        onClick={() => { setEditing(cat); setEditVal(String(budgetAmt)); }}
                        className="p-2 rounded-xl transition-all duration-300 theme-muted"
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--accent-glow)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
                        title="Edit budget"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-3 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: barColor }}
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
