function SavingsGoal({ darkMode }) {
  const saved = 70000;
  const target = 100000;

  const percentage =
    (saved / target) * 100;

  return (
    <div
      className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1
      ${
        darkMode
          ? "bg-gradient-to-br from-[#111C44] to-[#0B1739] border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold">
          Savings Goal
        </h2>

        <button
          className={`text-sm transition-all duration-300
          ${
            darkMode
              ? "text-violet-400 hover:text-violet-300"
              : "text-violet-600 hover:text-violet-500"
          }`}
        >
          Edit Goal
        </button>

      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center">

        {/* Circle */}
        <div className="relative w-48 h-48">

          <svg
            className="w-48 h-48 rotate-[-90deg]"
          >

            {/* Gradient */}
            <defs>

              <linearGradient id="gradient">

                <stop
                  offset="0%"
                  stopColor="#7C3AED"
                />

                <stop
                  offset="100%"
                  stopColor="#3B82F6"
                />

              </linearGradient>

            </defs>

            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke={
                darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "#E5E7EB"
              }
              strokeWidth="14"
              fill="transparent"
            />

            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="14"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={440}
              strokeDashoffset={
                440 -
                (440 * percentage) / 100
              }
            />

          </svg>

          {/* Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h1 className="text-4xl font-bold">
              {Math.round(percentage)}%
            </h1>

            <p
              className={`text-sm mt-1
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Completed
            </p>

          </div>

        </div>

        {/* Amount Section */}
        <div className="mt-8 text-center">

          <h3 className="text-3xl font-bold">

            ₹{saved.toLocaleString()}

          </h3>

          <p
            className={`mt-2
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            saved from ₹
            {target.toLocaleString()}
          </p>

        </div>

        {/* Progress Info */}
        <div
          className={`mt-6 px-4 py-3 rounded-2xl text-sm
          ${
            darkMode
              ? "bg-white/5 text-gray-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          You're doing great! Keep saving 🚀
        </div>

      </div>

    </div>
  );
}

export default SavingsGoal;