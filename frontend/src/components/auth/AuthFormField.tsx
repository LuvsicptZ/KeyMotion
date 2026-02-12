import { useFormContext } from "react-hook-form";

type AuthFormFieldProps = React.ComponentProps<"input"> & {
  name: string;
  label: string;
};

export const AuthFormField = ({
  name,
  label,
  type = "text",
  autoComplete,
  ...props
}: AuthFormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="block mb-3">
      <span className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <input
        className="mt-1 w-full border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-3 py-2 outline-none focus:border-yellow-400 focus:ring-0"
        type={type}
        autoComplete={autoComplete}
        {...register(name)}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{String(errors[name]?.message)}</p>
      )}
    </label>
  );
};
