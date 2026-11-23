"use client";

import { Search } from "lucide-react";

export default function HeroSearchTrigger() {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-manhaj-search"))}
            className="group mx-auto mb-8 flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl border border-(--border-color) bg-(--bg-card)/90 px-4 py-3.5 text-left text-xs text-(--text-muted) shadow-lg backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-(--accent-emerald)/70 md:text-sm"
        >
            <span className="flex items-center gap-3 truncate">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-(--badge-bg) text-(--accent-emerald) transition group-hover:scale-105">
                    <Search className="h-4 w-4" />
                </span>
                <span className="truncate">
                    যেকোনো মাসআলা, পরিভাষা, কিতাব বা শাইখের বক্তব্য খুঁজুন...
                </span>
            </span>

            <kbd className="hidden shrink-0 rounded-lg border border-(--border-color) bg-(--bg-main) px-2.5 py-1 font-mono text-[11px] font-semibold text-(--accent-gold) sm:inline-block">
                Ctrl K
            </kbd>
        </button>
    );
}