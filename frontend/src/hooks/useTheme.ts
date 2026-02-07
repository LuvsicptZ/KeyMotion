import { useEffect, useState } from "react"

export default function useTheme() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme)
            return;

        }

        root.classList.add(theme!);
        localStorage.setItem("theme", theme!);
    }, [theme]);

    return { theme, setTheme };
}