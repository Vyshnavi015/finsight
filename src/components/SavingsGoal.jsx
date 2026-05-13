import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import AddGoal from "./AddGoal";
import { useAuth } from "../context/AuthContext";

// ── Edit Modal ────────────────────────────────────────────
function EditGoalModal({ darkMode, goal, onClose, onSave }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: goal.title,
    saved: goal.saved,
    target: goal.target,
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
      const res = await fetch(`http://localhost:5000/goals/${goal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          saved: Number(form.saved),
          target: Number(form.target),
        }),
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
          <h2 className="text-2xl font-bold">Edit Goal</h2>
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
            <label className="block mb-2 text-sm font-medium">Goal Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Saved Amount (₹)</label>
            <input
              type="number"
              value={form.saved}
              onChange={(e) => setForm((p) => ({ ...p, saved: e.target.value }))}
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Target Amount (₹)</label>
            <input
              type="number"
              value={form.target}
              onChange={(e) => setForm((p) => ({ ...p, target: e.target.value }))}
              className={inputCls}
              required
            />
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
function SavingsGoal({ darkMode, goals = [], setGoals }) {
  const { token } = useAuth();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editGoal, setEditGoal] = useState(null);

  // DELETE
  async function deleteGoal(id) {
    try {
      await fetch(`http://localhost:5000/goals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // SAVE EDIT
  function handleSave(updated) {
    setGoals((prev) => prev.map((g) => (g._id === updated._id ? updated : g)));
    setEditGoal(null);
  }

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl transition-all duration-500 ${
          darkMode
            ? "border-white/10 bg-gradient-to-br from-[#111C44] to-[#0B1739] text-white"
            : "border-gray-200 bg-white text-black"
        }`}
      >
        {/* Glow */}
        {darkMode && (
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        )}

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Savings Goals</h2>
          <button
            type="button"
            onClick={() => setShowGoalForm(true)}
            className="bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg"
          >
            + Add Goal
          </button>
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div
            className={`rounded-2xl border p-10 text-center ${
              darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"
            }`}
          >
            No savings goals added yet
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map((goal) => {
            const percentage =
              goal?.target > 0 ? Math.min((goal.saved / goal.target) * 100, 100) : 0;

            return (
              <div
                key={goal._id}
                className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 ${
                  darkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
                }`}
              >
                {/* Action icons — top right of card */}
                <div className="absolute top-4 right-4 flex items-center gap-1">
                  <button
                    onClick={() => setEditGoal(goal)}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? "text-gray-400 hover:text-violet-400 hover:bg-violet-500/10"
                        : "text-gray-400 hover:text-violet-600 hover:bg-violet-50"
                    }`}
                    title="Edit goal"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteGoal(goal._id)}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                    title="Delete goal"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold pr-16">{goal.title}</h3>

                    <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Target: ₹{goal.target.toLocaleString()}
                    </p>

                    {/* Saved Amount */}
                    <div className="mt-6">
                      <h1 className={`text-4xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                        ₹{goal.saved.toLocaleString()}
                      </h1>
                      <span className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Saved
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className={`h-3 w-full overflow-hidden rounded-full ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {percentage >= 100 ? "Goal reached! 🎉" : "You're doing great! Keep it up 🎉"}
                        </p>
                        <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Illustration */}
                  <div className="relative flex items-center justify-center">
                    {darkMode && (
                      <div className="absolute h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
                    )}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2920/2920329.png"
                      alt="Goal"
                      className="relative z-10 w-40 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Goal Modal */}
        {showGoalForm && (
          <AddGoal
            darkMode={darkMode}
            setShowGoalForm={setShowGoalForm}
            goals={goals}
            setGoals={setGoals}
          />
        )}
      </div>

      {/* Edit Goal Modal */}
      {editGoal && (
        <EditGoalModal
          darkMode={darkMode}
          goal={editGoal}
          onClose={() => setEditGoal(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default SavingsGoal;
