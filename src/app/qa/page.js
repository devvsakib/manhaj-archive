"use client";

import { useState } from "react";
import {
    HelpCircle,
    Search,
    BookOpen,
    Copy,
    Check,
    Calendar,
    Hash,
    MessageSquarePlus,
    X,
    CheckCircle2,
} from "lucide-react";
import { qaData } from "@/data/extendedContentData";

export default function QAPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("সবগুলো");
    const [copiedId, setCopiedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const categories = [
        "সবগুলো",
        "মানহাজ ও আদব",
        "সমসাময়িক ফিতনা",
        "ইলম অর্জন",
        "আকিদা ও তাওহীদ",
    ];

    // সার্চ এবং ক্যাটাগরি ফিল্টারিং
    const filteredQA = qaData.filter((item) => {
        const matchesCategory =
            selectedCategory === "সবগুলো" || item.category === selectedCategory;
        const matchesSearch =
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const handleCopyQA = (item) => {
        const textToCopy = `প্রশ্ন (${item.id}): ${item.question}\n\nসংক্ষিপ্ত উত্তর: ${item.shortAnswer}\n\nবিস্তারিত: ${item.detailedAnswer}\n\nদলিল ও রেফারেন্স: ${item.reference}\n\nসূত্র: Manhaj Archive (manhajarchive.com/qa)`;
        navigator.clipboard.writeText(textToCopy);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2500);
    };

    const handleAskSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setIsModalOpen(false);
        }, 2000);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            {/* Header Section */}
            <div className="mb-10 flex flex-col items-center text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>ফতোয়া ও সংশয় নিরসন আর্কাইভ</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    প্রশ্নোত্তর ও দলিলভিত্তিক সমাধান
                </h1>
                <p className="mx-auto mb-6 max-w-2xl text-sm text-(--text-muted) md:text-base">
                    আকিদা, মানহাজ, আদব এবং সমসাময়িক বিভ্রান্তি নিয়ে গুরুত্বপূর্ণ প্রশ্নগুলোর কুরআন, সুন্নাহ ও সালাফদের মূলনীতির আলোকে প্রামাণ্য উত্তর।
                </p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white border border-[#2E8B57]/60 transition hover:bg-[#1b593d]"
                >
                    <MessageSquarePlus className="h-4 w-4 text-[#C59B27]" />
                    <span>নতুন প্রশ্ন পাঠান</span>
                </button>
            </div>

            {/* Search & Filter Controls */}
            <div className="mb-10 rounded-2xl border border-(--border-color) bg-(--bg-card) p-5">
                <div className="relative mb-4">
                    <Search className="absolute left-4 top-3.5 h-4 w-4 text-(--text-muted)" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="প্রশ্ন, বিষয় বা কিতাবের রেফারেন্স লিখে খুঁজুন (যেমন: হাদ্দাদী, ইবনু তাইমিয়াহ, #QA-101)..."
                        className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) py-3 pl-11 pr-4 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-[#2E8B57] focus:outline-none"
                    />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${selectedCategory === cat
                                    ? "bg-[#14452F] text-white border border-[#2E8B57]"
                                    : "bg-(--bg-main) text-(--text-muted) border border-(--border-color) hover:text-(--text-main)"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <span className="text-xs text-(--text-muted)">
                        মোট {filteredQA.length}টি প্রশ্নোত্তর পাওয়া গেছে
                    </span>
                </div>
            </div>

            {/* Q&A Cards List */}
            {filteredQA.length > 0 ? (
                <div className="space-y-6">
                    {filteredQA.map((item) => (
                        <article
                            key={item.id}
                            className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-[#2E8B57]/50 md:p-8"
                        >
                            {/* Card Top Meta */}
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-(--border-color) pb-3 text-xs">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center gap-1 font-inter font-bold text-[#C59B27]">
                                        <Hash className="h-3.5 w-3.5" />
                                        {item.id}
                                    </span>
                                    <span className="rounded bg-[#14452F]/10 dark:bg-[#14452F]/50 px-2.5 py-0.5 font-semibold text-[#3CB371]">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-(--text-muted)">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {item.date}
                                    </span>
                                    <button
                                        onClick={() => handleCopyQA(item)}
                                        className="inline-flex items-center gap-1 font-semibold text-(--text-main) hover:text-[#C59B27] transition"
                                        title="প্রশ্ন ও উত্তর কপি করুন"
                                    >
                                        {copiedId === item.id ? (
                                            <>
                                                <Check className="h-3.5 w-3.5 text-[#3CB371]" />
                                                <span className="text-[#3CB371]">কপি হয়েছে</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-3.5 w-3.5" />
                                                <span>কপি</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Question Heading */}
                            <h2 className="mb-4 text-xl font-bold leading-snug text-(--text-main) md:text-2xl">
                                প্রশ্ন: {item.question}
                            </h2>

                            {/* Short Ruling Highlight */}
                            <div className="mb-4 rounded-lg border-l-4 border-[#3CB371] bg-(--bg-subtle) px-4 py-3 text-sm font-semibold text-(--text-main)">
                                সংক্ষিপ্ত উত্তর: {item.shortAnswer}
                            </div>

                            {/* Detailed Answer */}
                            <p className="mb-5 text-sm leading-relaxed text-(--text-muted) md:text-base">
                                {item.detailedAnswer}
                            </p>

                            {/* Evidence & Reference Box */}
                            <div className="rounded-xl border border-[#C59B27]/25 bg-(--bg-main) p-4 text-xs leading-relaxed md:text-sm">
                                <div className="mb-1.5 flex items-center gap-1.5 font-bold text-[#C59B27]">
                                    <BookOpen className="h-4 w-4" />
                                    <span>দলিল ও কিতাবের রেফারেন্স:</span>
                                </div>
                                <p className="text-(--text-muted)">{item.reference}</p>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-12 text-center">
                    <p className="text-sm text-(--text-muted)">
                        আপনার অনুসন্ধানের সাথে মিলে এমন কোনো প্রশ্নোত্তর পাওয়া যায়নি। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।
                    </p>
                </div>
            )}

            {/* Ask a Question Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between border-b border-(--border-color) pb-3">
                            <h3 className="text-lg font-bold text-(--text-main)">
                                আপনার প্রশ্ন বা সংশয় পাঠান
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-lg p-1 text-(--text-muted) hover:bg-slate-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {submitted ? (
                            <div className="py-10 text-center">
                                <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-[#3CB371]" />
                                <h4 className="mb-1 text-lg font-bold text-(--text-main)">
                                    জাযাকাল্লাহু খাইরান!
                                </h4>
                                <p className="text-xs text-(--text-muted)">
                                    আপনার প্রশ্নটি গৃহীত হয়েছে। গবেষণা বিভাগ দলিলসহ যাচাই করে শীঘ্রই আর্কাইভে যুক্ত করবে।
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleAskSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                                        বিষয় / ক্যাটাগরি নির্বাচন করুন
                                    </label>
                                    <select className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) px-3.5 py-2.5 text-sm text-(--text-main) focus:border-[#2E8B57] focus:outline-none">
                                        <option>মানহাজ ও আদব</option>
                                        <option>সমসাময়িক ফিতনা</option>
                                        <option>আকিদা ও তাওহীদ</option>
                                        <option>ইলম অর্জন ও কিতাব</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                                        আপনার প্রশ্নটি বিস্তারিত লিখুন
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="আপনার প্রশ্ন বা সংশয়টি স্পষ্টভাবে লিখুন..."
                                        className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-3.5 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-[#2E8B57] focus:outline-none"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-xl border border-(--border-color) px-4 py-2 text-xs font-semibold text-(--text-muted) hover:text-(--text-main)"
                                    >
                                        বাতিল
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-[#14452F] px-5 py-2 text-xs font-semibold text-white border border-[#2E8B57]/60 hover:bg-[#1b593d]"
                                    >
                                        প্রশ্ন জমা দিন
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}