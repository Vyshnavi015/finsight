import { useState } from "react";

function AddTransaction({
  darkMode,
  setShowForm,
}) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

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
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            transaction
          ),
        }
      );

      const data =
        await response.json();

      console.log(data);

      alert(
        "Transaction Added"
      );

      // Clear fields
      setTitle("");
      setAmount("");
      setCategory("");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl border
      ${
        darkMode
          ? "bg-[#111C44] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >

      <h2 className="text-2xl font-bold mb-6">
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Title */}
        <input
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-transparent border border-gray-500 outline-none"
          required
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-transparent border border-gray-500 outline-none"
          required
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-transparent border border-gray-500 outline-none"
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

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 transition-all duration-300 p-4 rounded-xl font-semibold"
        >
          Add Transaction
        </button>

      </form>

    </div>
  );
}

export default AddTransaction;