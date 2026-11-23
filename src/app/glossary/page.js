"use client";

import { useState } from "react";
import { BookA, Search } from "lucide-react";
import { glossaryTerms } from "@/data/interactiveFeaturesData";

export default function GlossaryPage() {
    const [query, setQuery] = useState("");

    const filteredTerms = glossaryTerms.filter(
        (item) =>
            item.term.toLowerCase().includes(query.toLowerCase()) ||
            item.shortMeaning.toLowerCase().includes(query.toLowerCase()) ||
            item.detailedExplanation.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                    <BookA className="h-3.5 w-3.5" />
                    <span>ইলমি পরিভাষা কোষ</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-[var(--text-main)] md:text-4xl">
                    আকিদা ও মানহাজ পরিভাষা অভিধান
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
                    কিতাব ও প্রবন্ধ অধ্যয়নের সময় ব্যবহৃত গুরুত্বপূর্ণ আরবি ও শরয়ি পরিভাষাগুলোর সংক্ষিপ্ত এবং প্রামাণ্য ব্যাখ্যা।
                </p>

                <div className="relative mx-auto max-w-md">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="পরিভাষা খুঁজুন (যেমন: হাদ্দাদিয়্যাহ, ইজতিহাদ, গুলু)..."
                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:border-[#2E8B57] focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {filteredTerms.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-(--accent-emerald)/60"
                    >
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <h2 className="text-xl font-bold text-(--accent-gold)">{item.term}</h2>
                            <span className="shrink-0 rounded bg-(--badge-bg) px-2.5 py-0.5 text-[11px] font-semibold text-(--badge-text)">
                                {item.category}
                            </span>
                        </div>
                        <p className="mb-3 text-sm font-semibold text-(--text-main)">
                            {item.shortMeaning}
                        </p>
                        <p className="text-xs leading-relaxed text-(--text-muted) md:text-sm">
                            {item.detailedExplanation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}