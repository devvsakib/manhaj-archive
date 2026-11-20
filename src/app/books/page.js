"use client";

import { useState } from "react";
import { BookMarked, User, Building2, Sparkles } from "lucide-react";
import { booksData } from "@/data/extendedContentData";

export default function BooksGuidePage() {
    const [selectedLevel, setSelectedLevel] = useState("সব স্তর");
    const levels = ["সব স্তর", "প্রাথমিক স্তর", "মধ্যম স্তর"];

    const filteredBooks =
        selectedLevel === "সব স্তর"
            ? booksData
            : booksData.filter((b) => b.level === selectedLevel);

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            {/* Page Header */}
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C59B27]/30 bg-[#14452F]/10 dark:bg-[#14452F]/40 px-4 py-1 text-xs font-medium text-[#C59B27]">
                    <BookMarked className="h-3.5 w-3.5" />
                    <span>তালিবুল ইলম পাঠক্রম</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    নির্ভরযোগ্য কিতাব ও পাঠ গাইড
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-(--text-muted) md:text-base">
                    সোশ্যাল মিডিয়ার ভাসা-ভাসা তথ্যের বদলে ধাপে ধাপে বিশুদ্ধ আকিদা, আদব ও মানহাজ শেখার জন্য প্রাজ্ঞ আলেমদের প্রস্তাবিত বইয়ের তালিকা।
                </p>
            </div>

            {/* Level Filter */}
            <div className="mb-10 flex justify-center gap-2">
                {levels.map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${selectedLevel === lvl
                            ? "bg-[#14452F] text-white border border-[#2E8B57]"
                            : "bg-(--bg-card) text-(--text-muted) border border-(--border-color) hover:text-slate-200"
                            }`}
                    >
                        {lvl}
                    </button>
                ))}
            </div>

            {/* Books Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="flex flex-col justify-between rounded-xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-[#2E8B57]/60"
                    >
                        <div>
                            <div className="mb-3 flex items-center justify-between text-xs">
                                <span className="rounded bg-[#14452F]/10 dark:bg-[#14452F]/60 px-2.5 py-1 font-semibold text-[#3CB371]">
                                    {book.level}
                                </span>
                                <span className="font-medium text-[#C59B27]">{book.category}</span>
                            </div>

                            <h2 className="mb-3 text-xl font-bold text-(--text-main)">
                                {book.title}
                            </h2>

                            <div className="mb-4 space-y-1.5 text-xs text-(--text-muted)">
                                <p className="flex items-center gap-2">
                                    <User className="h-3.5 w-3.5 text-[#C59B27]" />
                                    <span>মূল লেখক: {book.author}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Building2 className="h-3.5 w-3.5 text-[#3CB371]" />
                                    <span>অনুবাদ/প্রকাশনী: {book.translator}</span>
                                </p>
                            </div>

                            <p className="mb-4 text-sm leading-relaxed text-slate-300">
                                {book.description}
                            </p>
                        </div>

                        <div className="rounded-lg border border-(--border-color)/80 bg-(--bg-main) p-3.5 text-xs text-slate-300 flex items-start gap-2">
                            <Sparkles className="h-4 w-4 shrink-0 text-[#C59B27] mt-0.5" />
                            <span>
                                <strong className="text-slate-200">কেন পড়বেন:</strong> {book.whyRead}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}