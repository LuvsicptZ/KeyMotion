type PixelLogoProps = {
  className?: string;
};

const PixelLogo = ({ className = "" }: PixelLogoProps) => {
  return (
    <h1 className={`fixed top-5 left-5 z-50 select-none ${className}`}>
      <span className="inline-flex items-center gap-2">
        <span className="grid grid-cols-2 gap-[2px] p-[2px] border-2 border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-900 shadow-[3px_3px_0_0_#334155] dark:shadow-[3px_3px_0_0_#facc15]">
          <span className="h-[6px] w-[6px] bg-yellow-400" />
          <span className="h-[6px] w-[6px] bg-slate-800 dark:bg-slate-100" />
          <span className="h-[6px] w-[6px] bg-slate-800 dark:bg-slate-100" />
          <span className="h-[6px] w-[6px] bg-yellow-400" />
        </span>

        <span className="inline-flex items-center text-xl md:text-2xl font-black uppercase leading-none tracking-wider">
          <span className="relative border-2 border-slate-900 bg-yellow-400 px-2 py-1 text-slate-900 shadow-[3px_3px_0_0_#334155]">
            <span className="absolute -right-[5px] -top-[5px] h-[6px] w-[6px] border border-slate-900 bg-orange-500" />
            Key
          </span>
          <span className="border-2 border-slate-700 dark:border-slate-200 bg-slate-200 dark:bg-slate-800 px-2 py-1 text-slate-700 dark:text-slate-100 shadow-[3px_3px_0_0_#64748b] dark:shadow-[3px_3px_0_0_#0f172a]">
            Motion
          </span>
        </span>
      </span>
    </h1>
  );
};

export default PixelLogo;
