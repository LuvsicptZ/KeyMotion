import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useAuth } from "../auth/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/typing", { replace: true });
    } catch {
      // AuthContext already sets `error`; keep page logic simple.
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
      <h1 className="fixed top-6 left-6 text-2xl font-bold text-yellow-500 tracking-tight z-10">
        Key<span className="text-slate-500 dark:text-slate-400">Motion</span>
      </h1>
      <ThemeToggle />

      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-15 bg-[linear-gradient(to_right,#64748b22_1px,transparent_1px),linear-gradient(to_bottom,#64748b22_1px,transparent_1px)] bg-size-[12px_12px]" />

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md bg-white dark:bg-slate-950 border-2 border-slate-800 dark:border-slate-200 p-6 md:p-7 shadow-[6px_6px_0_0_#334155] dark:shadow-[6px_6px_0_0_#facc15]"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">LOGIN</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Enter your account info.</p>

        <label className="block mb-3">
          <span className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
            EMAIL
          </span>
          <input
            className="mt-1 w-full border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-3 py-2 outline-none focus:border-yellow-400 focus:ring-0"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
            PASSWORD
          </span>
          <div className="mt-1 relative">
            <input
              className="w-full border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-3 pr-16 py-2 outline-none focus:border-yellow-400 focus:ring-0"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              maxLength={24}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-0 top-0 h-full px-3 border-l-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              {showPassword ? (
                <IoEyeOffSharp className="h-4 w-4" />
              ) : (
                <IoEyeSharp className="h-4 w-4" />
              )}
            </button>
          </div>
        </label>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          className="w-full border-2 border-slate-900 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Start Typing"}
        </button>

        <p className="text-sm mt-4 text-slate-600 dark:text-slate-300">
          No account?{" "}
          <Link className="font-semibold text-yellow-600 hover:text-yellow-500" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;