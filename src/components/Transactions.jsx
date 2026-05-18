import { useState } from "react";
import { ShoppingBag, Utensils, Car, Tv, Trash2, Pencil, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const getIcon = (cat) => ({ Shopping: ShoppingBag, Food: Utensils, Travel: Car }[cat] || Tv);
const getColor = (cat) => ({ Shopping: "bg-pink-500", Food: "bg-orange-500", Travel: "bg-blue-500" }[cat] || "bg-red-500");
const CATEGORIES = ["Shopping", "Food", "Travel", "Entertainment"];

const inputStyle = {
  background:  "var(--bg-input)",
  borderColor: "var(--border)",
  color:       "var(--text-primary)",
};

// ── Edit Modal ────────────────────────────────────────────
function EditTransactionModal({ item, onClose, onSave }) {
  const { token } = useAuth();
  const [form,    setForm]    = useState({ title: item.title, amount: item.amount, category: item.category });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res  = await fetch(`http://localhost:5000/transactions/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) onSave(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="w-full max-w-lg rounded-3xl shadow-2xl border p-6 sm:p-8 transition-all duration-300"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Edit Transaction</h2>
          <button onClick={onClose} className="p-2 rounded-xl transition-all theme-muted hover:opacity-80">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Transaction Title", key: "title",  type: "text",   placeholder: "" },
            { label: "Amount",            key: "amount", type: "number", placeholder: "" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block mb-2 text-sm font-medium theme-muted">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full p-4 rounded-2xl outline-none border transition-all duration-300"
                style={inputStyle}
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-2 text-sm font-medium theme-muted">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full p-4 rounded-2xl outline-none border transition-all duration-300"
              style={inputStyle}
              required
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="flex-1 p-4 rounded-2xl font-semibold transition-all" style={{ background: "rgba(255,255,255,0.08)" }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 p-4 rounded-2xl font-semibold text-white transition-all shadow-lg disabled:opacity-50" style={{ background: "var(--accent)" }}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────
function Transactions({ darkMode, transactions, setTransactions }) {
  const { token } = useAuth();
  const [editItem, setEditItem] = useState(null);

  async function deleteTransaction(id) {
    try {
      await fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) { console.error(err); }
  }

  function handleSave(updated) {
    setTransactions((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    setEditItem(null);
  }

  return (
    <>
      <div
        className="rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button className="text-sm transition-all duration-300" style={{ color: "var(--accent)" }}>
            View All
          </button>
        </div>

        {/* Empty */}
        {transactions.length === 0 && (
          <div className="text-center py-10 rounded-2xl border theme-muted" style={{ borderColor: "var(--border)" }}>
            No Transactions Yet
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {transactions.map((item) => {
            const Icon = getIcon(item.category);
            return (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{ cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${getColor(item.category)} flex items-center justify-center shadow-lg text-white`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm mt-1 theme-muted">{item.category}</p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <p className="text-red-400 font-semibold text-sm sm:text-base">- ₹{item.amount}</p>

                  <button
                    onClick={() => setEditItem(item)}
                    className="p-2 rounded-xl transition-all duration-300 theme-muted"
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--accent-glow)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteTransaction(item._id)}
                    className="p-2 rounded-xl transition-all duration-300 theme-muted"
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F87171"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {editItem && (
        <EditTransactionModal item={editItem} onClose={() => setEditItem(null)} onSave={handleSave} />
      )}
    </>
  );
}

export default Transactions;
