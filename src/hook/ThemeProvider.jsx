"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    isDark: true,
    toggleTheme: () => { },
});

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("ma_theme");
        const prefersDark =
            saved === "dark" ||
            (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);

        setIsDark(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            localStorage.setItem("ma_theme", next ? "dark" : "light");
            document.documentElement.classList.toggle("dark", next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark: mounted ? isDark : true, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}