import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

function StatCard({ title, amount, color, icon: Icon, darkMode, onEdit, subtitle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative rounded-2xl shadow-xl p-6 border transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
    >
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 theme-muted hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--accent-glow)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
          title="Edit"
        >
          <Pencil size={15} />
        </button>
      )}

      {/* Icon Box */}
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-5 text-white`}>
        <Icon size={28} />
      </div>

      {/* Title */}
      <p className="text-sm theme-muted">{title}</p>

      {/* Amount */}
      <h1 className="text-3xl font-bold mt-2">{amount}</h1>

      {/* Subtitle */}
      <p className="text-sm mt-4 text-green-400">{subtitle || "Updated live"}</p>
    </motion.div>
  );
}

export default StatCard;
