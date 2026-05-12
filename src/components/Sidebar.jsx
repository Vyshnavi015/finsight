import {
  LayoutDashboard,
  Wallet,
  Target,
  Settings,
  LogOut,
  User,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Transactions",
    icon: Wallet,
  },
  {
    title: "Goals",
    icon: Target,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

function Sidebar({ darkMode })  {
  return (
<div
  className={`hidden md:flex md:w-72 min-h-screen border-r border-white/10 flex-col justify-between p-6 transition-all duration-500 ${
    darkMode
      ? "bg-[#0B1739] text-white"
      : "bg-white text-black"
  }`}
>
      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="mb-12">

          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            FinSight
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Smart Finance Tracker
          </p>

        </div>

        {/* Menu */}
        <div className="space-y-3">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
                  
                  ${
                    item.active
                      ? "bg-violet-600 shadow-lg shadow-violet-500/20"
                      : "hover:bg-white/10"
                  }
                `}
              >

                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>

              </button>
            );
          })}

        </div>

      </div>

      {/* Bottom Section */}
      <div>

        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center">

              <User size={22} />

            </div>

            <div>

              <h3 className="font-semibold">
                Priya
              </h3>

              <p className="text-gray-400 text-sm">
                Premium User
              </p>

            </div>

          </div>

        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 p-4 rounded-2xl transition-all duration-300">

          <LogOut size={20} />

          Logout

        </button>

      </div>
    </div>
  );
}

export default Sidebar;