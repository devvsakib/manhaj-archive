"use client";

import { useState, useMemo, useEffect } from "react";
import {
    BookA,
    Search,
    ChevronRight,
    X,
    Copy,
    Check,
    BookOpen,
    Sparkles,
    Filter,
} from "lucide-react";
import { glossaryTerms } from "@/data/interactiveFeaturesData";

export default function GlossaryPage() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("সকল পরিভাষা");
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    // ডাটা থেকে অটোমেটিক ইউনিক ক্যাটাগরি বের করা
    const categories = useMemo(() => {
        const unique = Array.from(
            new Set(glossaryTerms.map((item) => item.category).filter(Boolean))
        );
        return ["সকল পরিভাষা", ...unique];
    }, []);

    // সার্চ এবং ক্যাটাগরি ফিল্টারিং
    const filteredTerms = useMemo(() => {
        const q = query.toLowerCase().trim();
        return glossaryTerms.filter((item) => {
            const matchesCat =
                selectedCategory === "সকল পরিভাষা" ||
                item.category === selectedCategory;
            const matchesQuery =
                !q ||
                item.term.toLowerCase().includes(q) ||
                item.shortMeaning.toLowerCase().includes(q) ||
                item.detailedExplanation.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
        });
    }, [query, selectedCategory]);

    // ESC চাপলে মোডাল বন্ধ হওয়া ও ব্যাকগ্রাউন্ড স্ক্রল লক
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedTerm(null);
        };
        if (selectedTerm) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedTerm]);

    const handleCopy = (item, e) => {
        if (e) e.stopPropagation();
        const text = `${item.term}\nঅর্থ: ${item.shortMeaning}\nবিস্তারিত: ${item.detailedExplanation}\n— Manhaj Archive`;
        navigator.clipboard.writeText(text);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                    <BookA className="h-3.5 w-3.5" />
                    <span>ইলমি পরিভাষা কোষ</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    আকিদা ও মানহাজ পরিভাষা অভিধান
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-(--text-muted) md:text-base">
                    কিতাব ও প্রবন্ধ অধ্যয়নের সময় ব্যবহৃত গুরুত্বপূর্ণ আরবি ও শরয়ি পরিভাষাগুলোর সংক্ষিপ্ত অর্থ এবং বিস্তারিত দালিলিক ব্যাখ্যা।
                </p>
            </div>

            {/* Search & Filter Control Box */}
            <div className="mb-8 rounded-2xl border border-(--border-color) bg-(--bg-card) p-4 md:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute top-3 left-3.5 h-4 w-4 text-(--text-muted)" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="পরিভাষা খুঁজুন (যেমন: হাদ্দাদিয়্যাহ, ইজতিহাদ, গুলু, তাফরীত)..."
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) py-2.5 pr-9 pl-10 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-(--accent-emerald) focus:outline-none"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="absolute top-2.5 right-3 rounded-md p-0.5 text-(--text-muted) hover:text-(--text-main)"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Total Counter */}
                    <div className="flex items-center gap-2 text-xs text-(--text-muted)">
                        <Filter className="h-3.5 w-3.5 text-(--accent-gold)" />
                        <span>
                            মোট পরিভাষা:{" "}
                            <strong className="text-(--text-main)">{filteredTerms.length}</strong> টি
                        </span>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="mt-4 flex flex-wrap gap-2 border-t border-(--border-color) pt-4">
                    {categories.map((cat) => {
                        const active = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition ${active
                                        ? "border-[#3CB371] bg-[#14452F] text-white"
                                        : "border-(--border-color) bg-(--bg-main) text-(--text-muted) hover:text-(--text-main)"
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Dictionary List View */}
            {filteredTerms.length === 0 ? (
                <div className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-12 text-center">
                    <p className="mb-2 text-sm font-semibold text-(--text-main)">
                        কোনো পরিভাষা পাওয়া যায়নি
                    </p>
                    <p className="text-xs text-(--text-muted)">
                        অন্য কোনো শব্দ দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-card) divide-y divide-(--border-color)">
                    {filteredTerms.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedTerm(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") setSelectedTerm(item);
                            }}
                            className="group flex cursor-pointer items-center justify-between gap-4 p-4 transition hover:bg-(--bg-subtle) md:px-6 md:py-5"
                        >
                            {/* Left: Index Number + Term & Short Meaning */}
                            <div className="flex min-w-0 flex-1 items-start gap-3.5 md:items-center">
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-(--border-color) bg-(--bg-main) text-xs font-bold text-(--accent-gold) md:mt-0">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex flex-wrap items-center gap-2.5">
                                        <h2 className="text-base font-bold text-(--accent-gold) transition group-hover:text-(--accent-emerald) md:text-lg">
                                            {item.term}
                                        </h2>
                                        <span className="rounded bg-(--badge-bg) px-2 py-0.5 text-[10px] font-semibold text-(--badge-text)">
                                            {item.category}
                                        </span>
                                    </div>
                                    <p className="line-clamp-1 text-xs text-(--text-muted) md:text-sm">
                                        {item.shortMeaning}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Quick Copy + Details Trigger */}
                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    onClick={(e) => handleCopy(item, e)}
                                    title="সংক্ষিপ্ত অর্থ কপি করুন"
                                    className="hidden rounded-lg border border-(--border-color) bg-(--bg-main) p-2 text-(--text-muted) transition hover:border-(--accent-emerald) hover:text-(--text-main) sm:inline-flex"
                                >
                                    {copiedId === item.id ? (
                                        <Check className="h-3.5 w-3.5 text-(--accent-emerald)" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                </button>

                                <span className="inline-flex items-center gap-1 rounded-xl border border-(--border-color) bg-(--bg-main) px-3 py-1.5 text-xs font-semibold text-(--text-main) transition group-hover:border-(--accent-emerald) group-hover:text-(--accent-emerald)">
                                    <span className="hidden sm:inline">ব্যাখ্যা</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detailed Explanation Modal */}
            {selectedTerm && (
                <div
                    onClick={() => setSelectedTerm(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 shadow-2xl md:p-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedTerm(null)}
                            aria-label="বন্ধ করুন"
                            className="absolute top-5 right-5 rounded-xl border border-(--border-color) bg-(--bg-main) p-2 text-(--text-muted) transition hover:border-(--accent-emerald) hover:text-(--text-main)"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Category Badge */}
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-(--badge-bg) px-2.5 py-1 text-xs font-semibold text-(--badge-text)">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>{selectedTerm.category}</span>
                        </div>

                        {/* Term Heading */}
                        <h2 className="mb-4 pr-10 text-2xl font-bold text-(--accent-gold) md:text-3xl">
                            {selectedTerm.term}
                        </h2>

                        {/* Short Meaning Highlight Box */}
                        <div className="mb-5 rounded-xl border-l-4 border-[#C59B27] bg-(--bg-main) p-4">
                            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-(--accent-gold)">
                                সংক্ষিপ্ত সংজ্ঞা
                            </p>
                            <p className="text-sm font-semibold leading-relaxed text-(--text-main) md:text-base">
                                {selectedTerm.shortMeaning}
                            </p>
                        </div>

                        {/* Detailed Explanation */}
                        <div className="mb-6 space-y-2">
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-(--accent-emerald)">
                                <BookOpen className="h-4 w-4" />
                                <span>বিস্তারিত দালিলিক ব্যাখ্যা</span>
                            </h3>
                            <p className="text-sm leading-relaxed text-(--text-muted) whitespace-pre-line md:text-base">
                                {selectedTerm.detailedExplanation}
                            </p>
                        </div>

                        {/* Optional Reference if present in data */}
                        {selectedTerm.reference && (
                            <div className="mb-6 rounded-xl border border-(--border-color) bg-(--bg-subtle) p-3.5 text-xs text-(--text-muted)">
                                <strong className="text-(--accent-gold)">তথ্যসূত্র: </strong>
                                {selectedTerm.reference}
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end gap-3 border-t border-(--border-color) pt-4">
                            <button
                                onClick={(e) => handleCopy(selectedTerm, e)}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-[#2E8B57]/60 bg-[#14452F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1b593d]"
                            >
                                {copiedId === selectedTerm.id ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 text-[#3CB371]" />
                                        <span>কপি হয়েছে</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5 text-[#C59B27]" />
                                        <span>পরিভাষা ও ব্যাখ্যা কপি করুন</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setSelectedTerm(null)}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) px-4 py-2 text-xs font-semibold text-(--text-main) transition hover:border-(--accent-emerald)"
                            >
                                বন্ধ করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}