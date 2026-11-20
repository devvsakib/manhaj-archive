"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="rounded-lg border border-slate-700/50 bg-(--bg-card) p-2 text-(--text-main) transition hover:border-[#C59B27]"
            aria-label="Toggle Theme"
            title={isDark ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
        >
            {isDark ? (
                <Sun className="h-4 w-4 text-[#C59B27]" />
            ) : (
                <Moon className="h-4 w-4 text-[#14452F]" />
            )}
        </button>
    );
}