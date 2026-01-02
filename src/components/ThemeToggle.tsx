import useTheme from "../hooks/useTheme"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <motion.button 
            onClick={handleToggle}
            className="
                fixed top-6 right-6 z-50
                p-3 rounded-full
                bg-white/10 backdrop-blur-md
                border border-white/20
                shadow-lg
                text-slate-700 dark:text-slate-200
                hover:bg-white/20 dark:hover:bg-white/10
                hover:scale-110
                transition-all duration-300
            "
            whileTap={{ scale: 0.9, rotate: 180 }}
            aria-label="Toggle Theme"
        >
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {theme === "dark" ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
            </motion.div>
        </motion.button>
    )
}

export default ThemeToggle