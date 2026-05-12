import { motion } from "framer-motion";

function StatCard({
  title,
  amount,
  color,
  icon: Icon,
  darkMode,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`border rounded-2xl shadow-xl p-6 transition-all duration-300 hover:-translate-y-1
${
  darkMode
    ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
    : "bg-white border-gray-200 text-black"
}`}
    >

      {/* Icon Box */}
      <div
        className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-5`}
      >
        <Icon size={28} />
      </div>

{/* Title */}
<p
  className={`text-sm ${
    darkMode
      ? "text-gray-400"
      : "text-gray-600"
  }`}
>
  {title}
</p>

{/* Amount */}
<h1 className="text-3xl font-bold mt-2">
  {amount}
</h1>

{/* Growth */}
<p
  className={`text-sm mt-4 ${
    darkMode
      ? "text-green-400"
      : "text-green-600"
  }`}
>
  +12.5% from last month
</p>

    </motion.div>
  );
}

export default StatCard;