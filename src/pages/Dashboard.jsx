import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ExpenseChart from "../components/ExpenseChart";
import Transactions from "../components/Transactions";
import BudgetPlanner from "../components/BudgetPlanner";
import SavingsGoal from "../components/SavingsGoal";

import AddTransaction from "../components/AddTransaction";

import {
  Wallet,
  ArrowDownCircle,
  PiggyBank,
  Landmark,
} from "lucide-react";

function Dashboard({
  darkMode,
  setDarkMode,
}) {

  const [activePage, setActivePage] =
    useState("dashboard");

  return (
    <div
      className={`min-h-screen md:flex transition-all duration-500 ${
        darkMode
          ? "bg-[#050816] text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* Sidebar */}
      <Sidebar
        darkMode={darkMode}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 xl:p-8 relative overflow-hidden">

        {/* Topbar */}
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

        {/* DASHBOARD VIEW */}
        {activePage === "dashboard" && (
          <>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

              <StatCard
                darkMode={darkMode}
                title="Total Income"
                amount="₹50,000"
                color="bg-green-500"
                icon={Wallet}
              />

              <StatCard
                darkMode={darkMode}
                title="Expenses"
                amount="₹30,000"
                color="bg-red-500"
                icon={ArrowDownCircle}
              />

              <StatCard
                darkMode={darkMode}
                title="Savings"
                amount="₹20,000"
                color="bg-blue-500"
                icon={PiggyBank}
              />

              <StatCard
                darkMode={darkMode}
                title="Balance"
                amount="₹20,000"
                color="bg-purple-500"
                icon={Landmark}
              />

              

            </div>

            {/* Dashboard Components */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

              <ExpenseChart darkMode={darkMode} />

              <Transactions darkMode={darkMode} />

              <BudgetPlanner darkMode={darkMode} />

              <SavingsGoal darkMode={darkMode} />

              <AddTransaction darkMode={darkMode} />

            </div>

          </>
        )}

        {/* TRANSACTIONS VIEW */}
        {activePage === "transactions" && (

          <div className="mt-8">

            <h1 className="text-3xl font-bold mb-6">
              Transactions
            </h1>

            <Transactions darkMode={darkMode} />

          </div>
        )}

        {/* GOALS VIEW */}
        {activePage === "goals" && (

          <div className="mt-8">

            <h1 className="text-3xl font-bold mb-6">
              Savings Goals
            </h1>

            <SavingsGoal darkMode={darkMode} />

          </div>
        )}

        {/* BUDGET VIEW */}
        {activePage === "budget" && (

          <div className="mt-8">

            <h1 className="text-3xl font-bold mb-6">
              Budget Planner
            </h1>

            <BudgetPlanner darkMode={darkMode} />

          </div>
        )}

        {/* SETTINGS VIEW */}
        {activePage === "settings" && (

          <div className="mt-8">

            <h1 className="text-3xl font-bold mb-6">
              Settings
            </h1>

            <div
              className={`rounded-2xl p-6 border transition-all duration-300 ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              Settings content coming soon...
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;