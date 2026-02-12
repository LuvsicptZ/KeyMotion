import { motion } from "framer-motion"
import { calculateWPM } from "../utils/helpers"
import { formatPercentage } from "../utils/helpers"

const Results = ({
    errors,
    total,
    accuracyPercentage,
    className,
    state,
    totalTime,
}: {
    errors: number
    total: number
    accuracyPercentage: number
    className?: string
    state: string
    totalTime: number
}) => {
    if (state !== "finish") { return null }
    const initial = { opacity: 0 }
    const animate = { opacity: 1 }


    return (
        <motion.div
            initial={initial}
            animate={animate}
            className={`w-full max-w-md mx-auto ${className}`}
        >
            <div className="pixel-card bg-white dark:bg-slate-800 flex flex-col gap-6 py-8">
                <div className="text-center border-b-4 border-slate-800 dark:border-slate-100 pb-4 mx-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Session Results</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 px-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400">Speed</span>
                        <span className="text-3xl font-black text-blue-500">{calculateWPM(total - errors, totalTime)} <small className="text-xs uppercase">WPM</small></span>
                    </div>
                    
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400">Accuracy</span>
                        <span className="text-3xl font-black text-green-500">{formatPercentage(accuracyPercentage)}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400">Total Typed</span>
                        <span className="text-xl font-bold">{total}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400">Errors</span>
                        <span className="text-xl font-bold text-red-500">{errors}</span>
                    </div>
                </div>

                <div className="px-8 pt-4">
                    <div className="text-[10px] text-center text-slate-400 italic">
                        Result automatically saved to leaderboard
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Results;