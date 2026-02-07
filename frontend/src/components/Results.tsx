import { motion } from "framer-motion"
import { calculateWPM } from "../utils/helpers"
import { IoIosHelpCircleOutline } from "react-icons/io"
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
        <motion.ul
            initial={initial}
            animate={animate}
            className={`flex flex-col items-center text-green-500 space-y-2 ${className}`}
        >
            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }} className="text-xl">
                <span className="text-2xl font-bold">Results</span>
            </motion.li>

            <motion.li
                initial={initial}
                animate={animate}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center gap-1"
            >
                Speed: {calculateWPM(total - errors, totalTime)} wpm

                <span className="relative has-tooltip inline-flex items-center">
                    <IoIosHelpCircleOutline className="hover:scale-105 cursor-help text-slate-700" />

                    <span
                        className="
                            tooltip
                            left-full top-1/2 ml-2 -translate-y-1/2
                            max-w-[calc(100vw-2rem)] whitespace-normal wrap-break-word sm:w-max sm:whitespace-nowrap
                            z-50 rounded bg-slate-200 px-3 py-2 text-xs leading-snug text-slate-700 shadow
                        "
                    >
                        WPM = (Correct characters / 5) / Time (minutes)
                    </span>
                </span>
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 0.6 }} className="">
                Accuracy: {formatPercentage(accuracyPercentage)}
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 1.0 }} className="">
                Typed: {total}
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 1.4 }} className="text-red-500">
                Errors: {errors}
            </motion.li>

        </motion.ul>
    )
}

export default Results;