import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      login(data.user, data.token);
      navigate("/");
    } catch {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-violet-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 mb-4 shadow-lg shadow-violet-500/30">
            <TrendingUp size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            FinSight
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Smart Finance Tracker</p>
        </div>

        {/* Card */}
        <div className="bg-[#0B1739] border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <div className="flex items-center gap-3 bg-[#111C44] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors duration-200">
                <Mail size={18} className="text-gray-400 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="flex items-center gap-3 bg-[#111C44] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-colors duration-200">
                <Lock size={18} className="text-gray-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-400 hover:text-gray-200 transition-colors shrink-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-violet-500/20 mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
