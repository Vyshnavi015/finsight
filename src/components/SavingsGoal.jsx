function SavingsGoal({ darkMode }) {

  const saved = 50000;
  const target = 80000;

  const percentage = (saved / target) * 100;

  return (

    <div
      className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl transition-all duration-500

      ${
        darkMode
          ? "border-white/10 bg-gradient-to-br from-[#111C44] to-[#0B1739] text-white"
          : "border-gray-200 bg-white text-black"
      }`}
    >

      {/* Glow Effect */}
      {darkMode && (
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Savings Goal
        </h2>

        <button
          className={`text-sm font-medium transition-all duration-300
          ${
            darkMode
              ? "text-violet-400 hover:text-violet-300"
              : "text-violet-600 hover:text-violet-500"
          }`}
        >
          Edit Goal
        </button>

      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Content */}
        <div className="flex-1">

          <h3 className="text-2xl font-semibold">
            Buy Mobile
          </h3>

          <p
            className={`mt-2
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Target: ₹{target.toLocaleString()}
          </p>

          {/* Saved Amount */}
          <div className="mt-6">

            <h1
              className={`text-4xl font-bold
              ${
                darkMode
                  ? "text-green-400"
                  : "text-green-600"
              }`}
            >
              ₹{saved.toLocaleString()}
            </h1>

            <span
              className={`ml-2
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Saved
            </span>

          </div>

          {/* Progress Bar */}
          <div className="mt-6">

            {/* Background */}
            <div
              className={`h-3 w-full overflow-hidden rounded-full
              ${
                darkMode
                  ? "bg-white/10"
                  : "bg-gray-200"
              }`}
            >

              {/* Progress */}
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">

              <p
                className={`text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                You're doing great! Keep it up! 🎉
              </p>

              <span
                className={`text-sm font-semibold
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {Math.round(percentage)}%
              </span>

            </div>

          </div>

        </div>

        {/* Right Illustration */}
        <div className="relative flex items-center justify-center">

          {darkMode && (
            <div className="absolute h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
          )}

          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920329.png"
            alt="Laptop"
            className="relative z-10 w-40 drop-shadow-2xl"
          />

        </div>

      </div>

    </div>
  );
}

export default SavingsGoal;