import { motion } from "framer-motion";

function StatCard({ title, amount, color, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gradient-to-br from-[#111C44] to-[#0B1739] border border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300"
    >

      {/* Icon Box */}
      <div
        className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-5`}
      >
        <Icon size={28} />
      </div>

      {/* Title */}
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      {/* Amount */}
      <h1 className="text-3xl font-bold mt-2">
        {amount}
      </h1>

      {/* Growth */}
      <p className="text-green-400 text-sm mt-4">
        +12.5% from last month
      </p>

    </motion.div>
  );
}

export default StatCard;