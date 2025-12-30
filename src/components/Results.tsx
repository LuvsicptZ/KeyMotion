import { motion } from "framer-motion"
import { calculateWPM } from "../utils/helpers"

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
        className={`flex flex-col items-center ${className}`}
        >
            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3 }} className="text-xl">
                <span className="text-2xl font-bold">Results</span>
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 0.3 }} className="text-xl">
                Speed: {calculateWPM(total - errors, totalTime)} wpm
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 0.6 }} className="text-xl">
                Accuracy: {accuracyPercentage.toFixed(2)}%
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 1.0 }} className="text-xl text-red-500">
                Errors: {errors}
            </motion.li>

            <motion.li initial={initial} animate={animate} transition={{ duration: 0.3, delay: 1.4 }} className="text-xl">
                Typed: {total}
            </motion.li>
        </motion.ul>
    )
}

export default Results;