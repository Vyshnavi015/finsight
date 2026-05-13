import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AddTransaction({
  darkMode,
  setShowForm,
  transactions,
  setTransactions,
}) {
  const { token } = useAuth();

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const transaction = {

      title,

      amount,

      category,

      source: "manual",
    };

    try {

      const response = await fetch(
        "http://localhost:5000/transactions",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(
            transaction
          ),
        }
      );

      const data =
        await response.json();

      console.log(data);

      // Update UI Instantly
      setTransactions([
        data.data,
        ...transactions,
      ]);

      // Clear Inputs
      setTitle("");
      setAmount("");
      setCategory("");

      // Close Modal
      setShowForm(false);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div
        className={`w-full max-w-lg rounded-3xl shadow-2xl border p-6 sm:p-8 transition-all duration-300
        ${
          darkMode
            ? "bg-[#111C44] border-white/10 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-bold">
            Add Transaction
          </h2>

          <button
            onClick={() =>
              setShowForm(false)
            }
            className={`text-3xl leading-none transition-all duration-300
            ${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-black"
            }`}
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Title */}
          <div>

            <label className="block mb-2 text-sm font-medium">
              Transaction Title
            </label>

            <input
              type="text"
              placeholder="Uber Ride"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className={`w-full p-4 rounded-2xl outline-none border transition-all duration-300
              ${
                darkMode
                  ? "bg-[#0B1739] border-white/10 placeholder:text-gray-500 focus:border-violet-500"
                  : "bg-gray-100 border-gray-300 placeholder:text-gray-400 focus:border-violet-500"
              }`}
              required
            />

          </div>

          {/* Amount */}
          <div>

            <label className="block mb-2 text-sm font-medium">
              Amount
            </label>

            <input
              type="number"
              placeholder="450"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className={`w-full p-4 rounded-2xl outline-none border transition-all duration-300
              ${
                darkMode
                  ? "bg-[#0B1739] border-white/10 placeholder:text-gray-500 focus:border-violet-500"
                  : "bg-gray-100 border-gray-300 placeholder:text-gray-400 focus:border-violet-500"
              }`}
              required
            />

          </div>

          {/* Category */}
          <div>

            <label className="block mb-2 text-sm font-medium">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className={`w-full p-4 rounded-2xl outline-none border transition-all duration-300
              ${
                darkMode
                  ? "bg-[#0B1739] border-white/10 focus:border-violet-500"
                  : "bg-gray-100 border-gray-300 focus:border-violet-500"
              }`}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

            </select>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
              className={`flex-1 p-4 rounded-2xl font-semibold transition-all duration-300
              ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-violet-600 hover:bg-violet-700 p-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
            >

              {loading
                ? "Adding..."
                : "Add Transaction"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTransaction;