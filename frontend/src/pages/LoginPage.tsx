import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { loginSchema, type LoginFormData } from "../auth/schemas";
import ThemeToggle from "../components/ThemeToggle";
import PixelLogo from "../components/PixelLogo";
import { AuthFormField } from "../components/auth/AuthFormField";
import { AuthPasswordField } from "../components/auth/AuthPasswordField";

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/typing";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await login(data);
    if (result.ok) {
      navigate(from, { replace: true });
    }
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
      <PixelLogo className="z-10" />
      <ThemeToggle />

      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-15 bg-[linear-gradient(to_right,#64748b22_1px,transparent_1px),linear-gradient(to_bottom,#64748b22_1px,transparent_1px)] bg-size-[12px_12px]" />

      <FormProvider {...form}>
        <form
          onSubmit={onSubmit}
          className="relative z-10 w-full max-w-md bg-white dark:bg-slate-950 border-2 border-slate-800 dark:border-slate-200 p-6 md:p-7 shadow-[6px_6px_0_0_#334155] dark:shadow-[6px_6px_0_0_#facc15]"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">LOGIN</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Enter your account info.</p>

          <AuthFormField name="email" label="EMAIL" type="email" autoComplete="email" />
          <AuthPasswordField name="password" label="PASSWORD" autoComplete="current-password" />

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
      </FormProvider>
    </div>
  );
};

export default LoginPage;
