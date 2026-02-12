import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

type AuthPasswordFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  name: string;
  label: string;
};

export const AuthPasswordField = ({
  name,
  label,
  autoComplete,
  ...props
}: AuthPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="block mb-4">
      <span className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <div className="mt-1 relative">
        <input
          className="w-full border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-3 pr-16 py-2 outline-none focus:border-yellow-400 focus:ring-0"
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          {...register(name)}
          {...props}
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
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{String(errors[name]?.message)}</p>
      )}
    </label>
  );
};
