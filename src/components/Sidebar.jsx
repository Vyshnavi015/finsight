import {
  LayoutDashboard, Wallet, Target, Settings,
  LogOut, User, BarChart2, Users, ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar({ darkMode, activePage, setActivePage }) {
  const { user, logout, isAdmin } = useAuth();

  const menuItems = [
    { title: "Dashboard",    icon: LayoutDashboard, key: "dashboard"    },
    { title: "Transactions", icon: Wallet,           key: "transactions" },
    { title: "Goals",        icon: Target,           key: "goals"        },
    { title: "Budget",       icon: Settings,         key: "budget"       },
    { title: "Analytics",    icon: BarChart2,        key: "analytics"    },
    ...(isAdmin ? [{ title: "Family", icon: Users, key: "family" }] : []),
    { title: "Settings",     icon: Settings,         key: "settings"     },
  ];

  const initials = (user?.name || "U")[0].toUpperCase();

  return (
    <div
      className="hidden md:flex md:w-72 min-h-screen border-r flex-col justify-between p-6 transition-all duration-500"
      style={{ background: "var(--bg-sidebar)", borderColor: "var(--border)", color: "var(--text-primary)" }}
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            FinSight
          </h1>
          <p className="text-sm mt-2 theme-muted">Smart Finance Tracker</p>
          {isAdmin && (
            <div className="flex items-center gap-1 mt-2">
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Admin</span>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon     = item.icon;
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
                style={
                  isActive
                    ? { background: "var(--accent)", color: "#fff", boxShadow: `0 8px 24px var(--accent-glow)` }
                    : { color: "var(--text-muted)" }
                }
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={22} />
                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div>
        {/* Profile Card */}
        <div
          className="rounded-2xl p-4 mb-4 border transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.04)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0"
              style={{ background: user?.avatar ? "transparent" : "var(--accent)" }}
            >
              {user?.avatar
                ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                : initials
              }
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{user?.name || "User"}</h3>
              <p className="text-xs truncate theme-muted">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-300 bg-red-500/20 hover:bg-red-500/30 text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
