import {
  ShoppingBag,
  Utensils,
  Car,
  Tv,
} from "lucide-react";

const transactions = [
  {
    title: "Shopping",
    amount: "- ₹4,000",
    time: "2 hours ago",
    icon: ShoppingBag,
    color: "bg-pink-500",
  },
  {
    title: "Food",
    amount: "- ₹1,200",
    time: "5 hours ago",
    icon: Utensils,
    color: "bg-orange-500",
  },
  {
    title: "Travel",
    amount: "- ₹3,500",
    time: "Yesterday",
    icon: Car,
    color: "bg-blue-500",
  },
  {
    title: "Netflix",
    amount: "- ₹799",
    time: "2 days ago",
    icon: Tv,
    color: "bg-red-500",
  },
];

function Transactions({ darkMode }) {
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
          Recent Transactions
        </h2>

        <button
          className={`text-sm transition-all duration-300
          ${
            darkMode
              ? "text-violet-400 hover:text-violet-300"
              : "text-violet-600 hover:text-violet-500"
          }`}
        >
          View All
        </button>

      </div>

      {/* Transactions List */}
      <div className="space-y-4">

        {transactions.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]
              ${
                darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-gray-100"
              }`}
            >

              {/* Left Section */}
              <div className="flex items-center gap-4">

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon size={20} />
                </div>

                {/* Transaction Info */}
                <div>

                  <h3 className="font-medium">
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm mt-1
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {item.time}
                  </p>

                </div>

              </div>

              {/* Amount */}
              <p className="text-red-500 font-semibold text-sm sm:text-base">
                {item.amount}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Transactions;