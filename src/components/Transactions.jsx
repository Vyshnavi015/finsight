import { useState } from "react";
import {
  ShoppingBag,
  Utensils,
  Car,
  Tv,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ── helpers ──────────────────────────────────────────────
const getIcon = (category) => {
  switch (category) {
    case "Shopping": return ShoppingBag;
    case "Food":     return Utensils;
    case "Travel":   return Car;
    default:         return Tv;
  }
};

const getColor = (category) => {
  switch (category) {
    case "Shopping":     return "bg-pink-500";
    case "Food":         return "bg-orange-500";
    case "Travel":       return "bg-blue-500";
    default:             return "bg-red-500";
  }
};

const CATEGORIES = ["Shopping", "Food", "Travel", "Entertainment"];

// ── Edit Modal ────────────────────────────────────────────
function EditTransactionModal({ darkMode, item, onClose, onSave }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: item.title,
    amount: item.amount,
    category: item.category,
  });
  const [loading, setLoading] = useState(false);

  const inputCls = `w-full p-4 rounded-2xl outline-none border transition-all duration-300 ${
    darkMode
      ? "bg-[#0B1739] border-white/10 placeholder:text-gray-500 focus:border-violet-500"
      : "bg-gray-100 border-gray-300 placeholder:text-gray-400 focus:border-violet-500"
  }`;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/transactions/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) onSave(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-lg rounded-3xl shadow-2xl border p-6 sm:p-8 transition-all duration-300 ${
          darkMode
            ? "bg-[#111C44] border-white/10 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Edit Transaction</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all duration-300 ${
              darkMode ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Transaction Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Amount</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className={inputCls}
              required
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 p-4 rounded-2xl font-semibold transition-all duration-300 ${
                darkMode ? "bg-white/10 hover:bg-white/20" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-violet-600 hover:bg-violet-700 p-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
function Transactions({ darkMode, transactions, setTransactions }) {
  const { token } = useAuth();
  const [editItem, setEditItem] = useState(null);

  // DELETE
  async function deleteTransaction(id) {
    try {
      await fetch(`http://localhost:5000/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // SAVE EDIT
  function handleSave(updated) {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
    setEditItem(null);
  }

  return (
    <>
      <div
        className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
          darkMode
            ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button
            className={`text-sm transition-all duration-300 ${
              darkMode
                ? "text-violet-400 hover:text-violet-300"
                : "text-violet-600 hover:text-violet-500"
            }`}
          >
            View All
          </button>
        </div>

        {/* Empty State */}
        {transactions.length === 0 && (
          <div
            className={`text-center py-10 rounded-2xl border ${
              darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"
            }`}
          >
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
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"
                }`}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${getColor(item.category)} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {item.category}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <p className="text-red-500 font-semibold text-sm sm:text-base">
                    - ₹{item.amount}
                  </p>

                  {/* Edit */}
                  <button
                    onClick={() => setEditItem(item)}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? "text-gray-400 hover:text-violet-400 hover:bg-violet-500/10"
                        : "text-gray-400 hover:text-violet-600 hover:bg-violet-50"
                    }`}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteTransaction(item._id)}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
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

      {/* Edit Modal */}
      {editItem && (
        <EditTransactionModal
          darkMode={darkMode}
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Transactions;
