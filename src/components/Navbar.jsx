"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldAlert, Search } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hook/ThemeProvider";

const navLinks = [
    { name: "আকিদা মানহাজ", href: "/aqeedah" },
    { name: "উসূল আদব", href: "/usul-adab" },
    { name: "লাইব্রেরি", href: "/library" },
    { name: "প্রশ্নোত্তর", href: "/qa" },
    { name: "অভিধান", href: "/glossary" },
    { name: "কুইজ", href: "/quiz" }
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-(--border-color) bg-(--bg-main)/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src={!isDark ? "/text.png" : "/text_dark.png"}
                        alt="Manhaj Archive"
                        className="h-10 object-cover"
                    />
                </Link>

                <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isActive = mounted && pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition ${isActive
                                    ? "text-[#C59B27] font-semibold"
                                    : "text-(--text-muted) hover:text-[#3CB371]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2.5">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => window.dispatchEvent(new Event("open-manhaj-search"))}
                        className="hidden items-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-main) px-3 py-1.5 text-xs text-(--text-muted) transition hover:border-(--accent-emerald) hover:text-(--text-main) md:inline-flex"
                    >
                        <Search className="h-3.5 w-3.5 text-(--accent-gold)" />
                        <span>খুঁজুন...</span>
                        <kbd className="rounded border border-(--border-color) bg-(--bg-card) px-1.5 py-0.5 font-mono text-[10px] text-(--text-muted)">
                            Ctrl K
                        </kbd>
                    </button>
                    <Link
                        href="/alerts"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-800/60 bg-red-700 dark:bg-red-950/60 px-3 py-2 text-xs font-semibold text-red-200 dark:text-red-300 transition hover:bg-red-900/60"
                    >
                        <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                        <span>ফিতনা</span>
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg border border-(--border-color) p-2 text-(--text-main) hover:bg-(--bg-card) xl:hidden"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-(--border-color) bg-(--bg-card) px-4 py-4 xl:hidden">
                    <nav className="grid grid-cols-2 gap-2 text-sm font-medium sm:grid-cols-3">
                        {navLinks.map((link) => {
                            const isActive = mounted && pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`rounded-lg px-3 py-2 transition ${isActive
                                        ? "bg-[#14452F]/50 text-[#C59B27] font-semibold"
                                        : "text-(--text-muted) hover:bg-(--bg-main)"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}