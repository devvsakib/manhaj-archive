"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight, BookOpen } from "lucide-react";
import FloatingSearchTrigger from "./FloatingSearchTrigger";
import { fitnaAlerts } from "@/data/fitnaData";
import { qaData, booksData } from "@/data/extendedContentData";
import { scholarsData } from "@/data/scholarsData";
import { statementsData } from "@/data/statementsData";
import { glossaryTerms } from "@/data/interactiveFeaturesData";

export default function GlobalSearchManager() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    // সব ডাটা সোর্স একসাথে ইনডেক্স করা
    const searchIndex = useMemo(() => {
        const items = [];

        (fitnaAlerts || []).forEach((a) =>
            items.push({
                id: `alert-${a.id}`,
                type: "ফিতনা অ্যালার্ট",
                title: a.title,
                subtitle: a.summary,
                href: `/alerts/${a.slug}`,
            })
        );

        (qaData || []).forEach((q) =>
            items.push({
                id: `qa-${q.id}`,
                type: "প্রশ্নোত্তর",
                title: q.question,
                subtitle: q.shortAnswer || q.detailedAnswer,
                href: "/qa",
            })
        );

        (booksData || []).forEach((b) =>
            items.push({
                id: `book-${b.id}`,
                type: "কিতাব লাইব্রেরি",
                title: b.title,
                subtitle: `${b.author} — ${b.description}`,
                href: "/library",
            })
        );

        (glossaryTerms || []).forEach((g) =>
            items.push({
                id: `gloss-${g.id}`,
                type: "পরিভাষা",
                title: g.term,
                subtitle: g.shortMeaning,
                href: "/glossary",
            })
        );

        (scholarsData || []).forEach((s) =>
            items.push({
                id: `scholar-${s.id}`,
                type: "উলামায়ে কেরাম",
                title: s.name,
                subtitle: `${s.role} — ${s.shortBio}`,
                href: "/scholars",
            })
        );

        (statementsData || []).forEach((st) =>
            items.push({
                id: `stmt-${st.id}`,
                type: "আলেমদের বক্তব্য",
                title: st.title,
                subtitle: `${st.scholarName}: ${st.excerpt}`,
                href: "/statements",
            })
        );

        return items;
    }, []);

    const results = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return searchIndex.slice(0, 6);
        return searchIndex
            .filter(
                (item) =>
                    item.title?.toLowerCase().includes(q) ||
                    item.subtitle?.toLowerCase().includes(q) ||
                    item.type?.toLowerCase().includes(q)
            )
            .slice(0, 12);
    }, [query, searchIndex]);

    // Ctrl+K / Cmd+K এবং কাস্টম ইভেন্ট লিসেনার
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") setIsOpen(false);
        };

        const handleCustomOpen = () => setIsOpen(true);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-manhaj-search", handleCustomOpen);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-manhaj-search", handleCustomOpen);
        };
    }, []);

    return (
        <>
            <FloatingSearchTrigger onOpenSearch={() => setIsOpen(true)} />

            {isOpen && (
                <div
                    onPointerDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-16 backdrop-blur-xs md:pt-24"
                >
                    <div
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-card) shadow-2xl"
                    >
                        {/* ভেতরের বাকি সব কোড আগের মতোই থাকবে */}
                        {/* Search Input */}
                        <div className="flex items-center gap-3 border-b border-(--border-color) px-4 py-3.5">
                            <Search className="h-5 w-5 shrink-0 text-(--accent-gold)" />
                            <input
                                type="text"
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="প্রবন্ধ, প্রশ্নোত্তর, পরিভাষা, কিতাব বা শাইখের নাম খুঁজুন..."
                                className="w-full bg-transparent text-sm text-(--text-main) placeholder-(--text-muted) focus:outline-none md:text-base"
                            />
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg border border-(--border-color) p-1.5 text-(--text-muted) hover:text-(--text-main)"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="max-h-[65vh] divide-y divide-(--border-color) overflow-y-auto">
                            {results.length === 0 ? (
                                <div className="p-8 text-center text-sm text-(--text-muted)">
                                    “{query}” সম্পর্কিত কোনো তথ্য পাওয়া যায়নি।
                                </div>
                            ) : (
                                results.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-start justify-between gap-3 p-4 transition hover:bg-(--bg-subtle)"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <span className="mb-1 inline-block rounded bg-(--badge-bg) px-2 py-0.5 text-[10px] font-semibold text-(--badge-text)">
                                                {item.type}
                                            </span>
                                            <h4 className="line-clamp-1 text-sm font-bold text-(--text-main) group-hover:text-(--accent-gold)">
                                                {item.title}
                                            </h4>
                                            <p className="mt-0.5 line-clamp-1 text-xs text-(--text-muted)">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-(--text-muted) group-hover:text-(--accent-emerald)" />
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Footer Hint */}
                        <div className="flex items-center justify-between border-t border-(--border-color) bg-(--bg-main) px-4 py-2.5 text-[11px] text-(--text-muted)">
                            <span className="inline-flex items-center gap-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-(--accent-emerald)" />
                                মোট {searchIndex.length}টি ইলমি রেকর্ড থেকে অনুসন্ধান
                            </span>
                            <span className="hidden sm:inline">ESC চেপে বন্ধ করুন</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}