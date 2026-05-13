import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

function StatCard({
  title,
  amount,
  color,
  icon: Icon,
  darkMode,
  onEdit,       // optional — shows pencil icon if provided
  subtitle,     // optional — replaces the "+12.5%" line
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`relative border rounded-2xl shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        darkMode
          ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      {/* Edit button — only on income card */}
      {onEdit && (
        <button
          onClick={onEdit}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 ${
            darkMode
              ? "text-gray-400 hover:text-violet-400 hover:bg-violet-500/10"
              : "text-gray-400 hover:text-violet-600 hover:bg-violet-50"
          }`}
          title="Set income"
        >
          <Pencil size={15} />
        </button>
      )}

      {/* Icon Box */}
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-5`}>
        <Icon size={28} />
      </div>

      {/* Title */}
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {title}
      </p>

      {/* Amount */}
      <h1 className="text-3xl font-bold mt-2">{amount}</h1>

      {/* Subtitle */}
      <p className={`text-sm mt-4 ${darkMode ? "text-green-400" : "text-green-600"}`}>
        {subtitle || "+12.5% from last month"}
      </p>
    </motion.div>
  );
}

export default StatCard;
