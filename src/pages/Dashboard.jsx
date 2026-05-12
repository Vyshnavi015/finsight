import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ExpenseChart from "../components/ExpenseChart";
import Transactions from "../components/Transactions";
import BudgetPlanner from "../components/BudgetPlanner";
import SavingsGoal from "../components/SavingsGoal";
import {
  Wallet,
  ArrowDownCircle,
  PiggyBank,
  Landmark,
} from "lucide-react";
function Dashboard({ darkMode, setDarkMode })  {
  return (
   <div
  className={`min-h-screen md:flex transition-all duration-500 ${
    darkMode
      ? "bg-[#050816] text-white"
      : "bg-gray-100 text-black"
  }`}
>

      <Sidebar darkMode={darkMode} />

      <div className="flex-1 p-4 sm:p-6 xl:p-8 relative overflow-hidden">

        <Topbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>
<div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

 <ExpenseChart darkMode={darkMode} />

  <Transactions darkMode={darkMode} />

  <BudgetPlanner darkMode={darkMode} />
   <SavingsGoal darkMode={darkMode} />

</div>

      </div>
    </div>
  );
}

export default Dashboard;