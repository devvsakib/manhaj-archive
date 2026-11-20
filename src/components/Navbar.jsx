"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldAlert } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
    { name: "হোম", href: "/" },
    { name: "আকিদা ও মানহাজ", href: "/aqeedah" },
    { name: "উসূল ও আদব", href: "/usul-adab" },
    { name: "কিতাব লাইব্রেরি", href: "/library" },
    { name: "প্রশ্নোত্তর", href: "/qa" },
    { name: "অভিধান", href: "/glossary" },
    { name: "কুইজ", href: "/quiz" },
    { name: "উলামাদের বক্তব্য", href: "/scholars" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-main)]/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Manhaj Archive"
                        className="h-10 w-10 rounded-lg border border-[#C59B27]/40 object-cover"
                    />
                    <div>
                        <span className="font-inter text-lg font-bold tracking-wide text-[var(--text-main)]">
                            MANHAJ <span className="text-[#C59B27]">ARCHIVE</span>
                        </span>
                        <p className="text-[11px] text-[var(--text-muted)]">
                            কুরআন, সুন্নাহ ও সালাফদের মানহাজ
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isActive = mounted && pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition ${isActive
                                        ? "text-[#C59B27] font-semibold"
                                        : "text-[var(--text-muted)] hover:text-[#3CB371]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Button + Theme Toggle + Mobile Menu */}
                <div className="flex items-center gap-2.5">
                    <ThemeToggle />

                    <Link
                        href="/alerts"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-800/60 bg-red-950/60 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-900/60"
                    >
                        <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                        <span>ফিতনা ওভারভিউ</span>
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg border border-[var(--border-color)] p-2 text-[var(--text-main)] hover:bg-[var(--bg-card)] xl:hidden"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile & Tablet Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-4 xl:hidden">
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
                                            : "text-[var(--text-muted)] hover:bg-[var(--bg-main)]"
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