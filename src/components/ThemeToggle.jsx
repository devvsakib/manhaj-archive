"use client";

import { useTheme } from "@/hook/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-(--border-color) bg-(--bg-card) text-(--accent-gold) transition hover:border-(--accent-emerald)"
        >
            {isDark ? (
                <Sun className="h-4 w-4 transition-transform duration-300 rotate-0" />
            ) : (
                <Moon className="h-4 w-4 transition-transform duration-300 rotate-0" />
            )}
        </button>
    );
}