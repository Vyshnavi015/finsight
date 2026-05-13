import {
  Bell,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Topbar({ darkMode, setDarkMode })  {
  const { user } = useAuth();
  const today = new Date();

  const formattedDate =
    today.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

      {/* Left Section */}
      <div>

        <h1 className="text-4xl font-bold">
          Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
        </h1>

        <p className="text-gray-400 mt-2">
          {formattedDate}
        </p>

      </div>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-[#111C44] border border-white/10 rounded-2xl px-4 py-3 w-full sm:w-[320px]">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm"
          />

        </div>

        <button
  onClick={() => setDarkMode(!darkMode)}
  className="w-14 h-14 bg-[#111C44] border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300"
>
  {darkMode ? (
    <Sun size={22} />
  ) : (
    <Moon size={22} />
  )}
</button>

        {/* Notification */}
        <button className="w-14 h-14 bg-[#111C44] border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300">

          <Bell size={22} />

        </button>

        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center text-lg font-bold">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>

      </div>

    </div>
  );
}

export default Topbar;