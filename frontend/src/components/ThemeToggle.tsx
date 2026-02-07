import useTheme from "../hooks/useTheme"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { useSound} from "use-sound";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    const [play] = useSound("/toggle.wav", { volume: 0.5 })

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        play()
    }

    return (
        <motion.button 
            onClick={handleToggle}
            className="
                fixed top-6 right-6 z-50
                p-3 rounded-full
                text-slate-700 dark:text-slate-200
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