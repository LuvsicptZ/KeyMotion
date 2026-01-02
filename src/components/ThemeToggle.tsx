import useTheme from "../hooks/useTheme"
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button 
        onClick={handleToggle}
        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        aria-label="Toggle Theme"
        >
            {theme === "dark" ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}

        </button>
    )
}

export default ThemeToggle