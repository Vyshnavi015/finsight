import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AddGoal({
  darkMode,
  setShowGoalForm,
  goals,
  setGoals,
}) {
  const { token } = useAuth();

  const [title, setTitle] =
    useState("");

  const [saved, setSaved] =
    useState("");

  const [target, setTarget] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const goal = {

      title,

      saved: Number(saved),

      target: Number(target),
    };

    try {

      const response = await fetch(
        "http://localhost:5000/goals",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(goal),
        }
      );

      const data =
        await response.json();

      // Update UI instantly
      setGoals([
        data.data,
        ...goals,
      ]);

      // Clear Inputs
      setTitle("");
      setSaved("");
      setTarget("");

      // Close Modal
      setShowGoalForm(false);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div
        className={`w-full max-w-lg rounded-3xl shadow-2xl border p-6 sm:p-8
        ${
          darkMode
            ? "bg-[#111C44] border-white/10 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-bold">
            Add Goal
          </h2>

          <button
            onClick={() =>
              setShowGoalForm(false)
            }
            className="text-3xl"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Goal Title */}
          <input
            type="text"
            placeholder="MacBook"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className={`w-full p-4 rounded-2xl outline-none border
            ${
              darkMode
                ? "bg-[#0B1739] border-white/10"
                : "bg-gray-100 border-gray-300"
            }`}
            required
          />

          {/* Saved */}
          <input
            type="number"
            placeholder="Saved Amount"
            value={saved}
            onChange={(e) =>
              setSaved(e.target.value)
            }
            className={`w-full p-4 rounded-2xl outline-none border
            ${
              darkMode
                ? "bg-[#0B1739] border-white/10"
                : "bg-gray-100 border-gray-300"
            }`}
            required
          />

          {/* Target */}
          <input
            type="number"
            placeholder="Target Amount"
            value={target}
            onChange={(e) =>
              setTarget(e.target.value)
            }
            className={`w-full p-4 rounded-2xl outline-none border
            ${
              darkMode
                ? "bg-[#0B1739] border-white/10"
                : "bg-gray-100 border-gray-300"
            }`}
            required
          />

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              type="button"
              onClick={() =>
                setShowGoalForm(false)
              }
              className={`flex-1 p-4 rounded-2xl
              ${
                darkMode
                  ? "bg-white/10"
                  : "bg-gray-200"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-violet-600 hover:bg-violet-700 p-4 rounded-2xl font-semibold"
            >

              {loading
                ? "Adding..."
                : "Add Goal"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddGoal;