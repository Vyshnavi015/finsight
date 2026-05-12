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

function Transactions() {
  return (
    <div className="bg-gradient-to-br from-[#111C44] to-[#0B1739] border border-white/10 rounded-2xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-6">
        
        <h2 className="text-xl font-semibold">
          Recent Transactions
        </h2>

        <button className="text-violet-400 text-sm">
          View All
        </button>

      </div>

      <div className="space-y-5">

        {transactions.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-white/5 p-3 rounded-xl transition-all duration-300"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-medium">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {item.time}
                  </p>
                </div>

              </div>

              <p className="text-red-400 font-semibold">
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