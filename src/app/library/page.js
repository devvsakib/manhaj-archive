"use client";

import { useState } from "react";
import { BookMarked, Download, ExternalLink, User, Building2 } from "lucide-react";
import { booksData } from "@/data/extendedContentData";

export default function DigitalKitabLibraryPage() {
    const [selectedLevel, setSelectedLevel] = useState("সব স্তর");
    const levels = ["সব স্তর", "প্রাথমিক স্তর", "মধ্যম স্তর"];
    const [previewPdfUrl, setPreviewPdfUrl] = useState(null);

    const filteredBooks =
        selectedLevel === "সব স্তর"
            ? booksData
            : booksData.filter((b) => b.level === selectedLevel);

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                    <BookMarked className="h-3.5 w-3.5" />
                    <span>ডিজিটাল কিতাব আর্কাইভ</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    মানহাজ কিতাব লাইব্রেরি
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-(--text-muted) md:text-base">
                    প্রাথমিক ও মধ্যম স্তরের তালিবুল ইলমদের জন্য প্রাজ্ঞ আলেমদের নির্বাচিত কিতাবসমূহ। এখান থেকে বইয়ের পরিচিতি জানুন এবং অনুমোদিত পিডিএফ বা প্রকাশনীর তথ্য সংগ্রহ করুন।
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
                                    <span>প্রকাশনী: {book.translator}</span>
                                </p>
                            </div>

                            <p className="mb-6 text-sm leading-relaxed text-slate-300">
                                {book.description}
                            </p>
                        </div>

                        {/* Action Buttons for PDF / Publisher */}
                        <div className="flex flex-wrap items-center gap-3 border-t border-(--border-color)/80 pt-4">
                            <button
                                onClick={() => setPreviewPdfUrl(book.pdfUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-[#14452F] px-4 py-2 text-xs font-semibold text-white border border-[#2E8B57]/60 transition hover:bg-[#1b593d]"
                            >
                                <Download className="h-3.5 w-3.5 text-[#C59B27]" />
                                <span>সাইটেই পড়ুন (PDF)</span>
                            </button>
                            <a
                                href={book.publisherUrl || "#"}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-(--bg-main) px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-[#C59B27]/50 hover:text-white"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>প্রকাশনী তথ্য</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {previewPdfUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-card)">
                        <div className="flex items-center justify-between border-b border-(--border-color) px-5 py-3">
                            <span className="text-xs font-bold text-[#C59B27]">
                                Manhaj Archive Digital Kitab Reader
                            </span>
                            <button
                                onClick={() => setPreviewPdfUrl(null)}
                                className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-semibold text-white hover:bg-red-900"
                            >
                                বন্ধ করুন ✕
                            </button>
                        </div>
                        <iframe
                            src={previewPdfUrl}
                            className="h-full w-full bg-white"
                            title="PDF Reader"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}