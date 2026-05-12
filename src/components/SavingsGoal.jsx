function SavingsGoal() {
  const saved = 70000;
  const target = 100000;

  const percentage = (saved / target) * 100;

  return (
    <div className="bg-gradient-to-br from-[#111C44] to-[#0B1739] border border-white/10 rounded-2xl shadow-xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Savings Goal
      </h2>

      <div className="flex flex-col items-center justify-center">

        {/* Circle */}
        <div className="relative w-48 h-48">

          <svg className="w-48 h-48 rotate-[-90deg]">
            <defs>
  <linearGradient id="gradient">
    <stop offset="0%" stopColor="#7C3AED" />
    <stop offset="100%" stopColor="#3B82F6" />
  </linearGradient>
</defs>
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="rgba(255,255,255,0.1)"
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
                440 - (440 * percentage) / 100
              }
            />

          </svg>

          {/* Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h1 className="text-4xl font-bold">
              {Math.round(percentage)}%
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Completed
            </p>

          </div>

        </div>

        {/* Amounts */}
        <div className="mt-8 text-center">

          <h3 className="text-2xl font-bold">
            ₹{saved.toLocaleString()}
          </h3>

          <p className="text-gray-400 mt-1">
            saved from ₹{target.toLocaleString()}
          </p>

        </div>

      </div>
    </div>
  );
}

export default SavingsGoal;