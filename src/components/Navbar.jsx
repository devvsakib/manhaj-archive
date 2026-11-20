"use client";

import { useState } from "react";
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
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-(--border-color)/80 bg-(--bg-main)/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C59B27]/40 bg-[#14452F] text-[#C59B27]">
                        <img src="/logo.png" className="rounded-sm" />
                    </div>
                    <div>
                        <span className="font-inter text-lg font-bold tracking-wide text-(--text-main)">
                            MANHAJ <span className="text-[#C59B27]">ARCHIVE</span>
                        </span>
                        <p className="text-[11px] text-(--text-muted)">
                            কুরআন, সুন্নাহ ও সালাফদের মানহাজ
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition ${isActive
                                    ? "text-[#C59B27] font-semibold"
                                    : "text-slate-300 hover:text-[#3CB371]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Button + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/alerts"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-800/60 bg-red-950/60 px-3.5 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-900/60"
                    >
                        <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                        <span>ফিতনা ওভারভিউ</span>
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg border border-(--border-color) p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-(--border-color) bg-[#121815] px-4 py-4 lg:hidden">
                    <nav className="flex flex-col space-y-3 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`rounded-md px-3 py-2 transition ${isActive
                                        ? "bg-[#14452F]/10 dark:bg-[#14452F]/50 text-[#C59B27]"
                                        : "text-slate-300 hover:bg-slate-800/60"
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