"use client";

import { useState, useMemo } from "react";
import { statementsData } from "@/data/statementsData";
import ScholarAvatar from "@/components/ScholarAvatar";
import {
    Quote,
    Search,
    Calendar,
    BookMarked,
    Copy,
    Check,
    ExternalLink,
    MessageSquareQuote,
} from "lucide-react";

const topics = [
    "সকল বিষয়",
    "আকিদা ও মানহাজ",
    "আলেমদের মর্যাদা ও আদব",
    "ইলম অর্জন ও উসূল",
];

export default function StatementsPage() {
    const [selectedTopic, setSelectedTopic] = useState("সকল বিষয়");
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedId, setCopiedId] = useState(null);

    const filteredStatements = useMemo(() => {
        return statementsData.filter((item) => {
            const matchesTopic =
                selectedTopic === "সকল বিষয়" || item.topic === selectedTopic;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                item.title.toLowerCase().includes(q) ||
                item.scholarName.toLowerCase().includes(q) ||
                item.fullStatement.toLowerCase().includes(q);
            return matchesTopic && matchesSearch;
        });
    }, [selectedTopic, searchQuery]);

    const handleCopy = (item) => {
        const text = `“${item.fullStatement}”\n\n— ${item.scholarName}\nউৎস: ${item.referenceSource}\n(Manhaj Archive)`;
        navigator.clipboard.writeText(text);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2500);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            {/* Header */}
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                    <MessageSquareQuote className="h-3.5 w-3.5" />
                    <span>প্রামাণ্য বক্তব্য ও ফতোয়া আর্কাইভ</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    প্রাজ্ঞ আলেমদের গুরুত্বপূর্ণ বক্তব্য ও বিবৃতি
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-(--text-muted)">
                    আকিদা, মানহাজ ও চলমান বিভ্রান্তি নিরসনে প্রাজ্ঞ সালাফি আলেমদের সরাসরি বক্তব্য, তারিখসহ রেফারেন্স এবং দালিলিক অবস্থান।
                </p>
            </div>

            {/* Search & Topic Filter */}
            <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute top-3 left-3.5 h-4 w-4 text-(--text-muted)" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="বক্তব্যের বিষয় বা শাইখের নাম লিখে খুঁজুন..."
                        className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) py-2.5 pr-4 pl-10 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-(--accent-emerald) focus:outline-none"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => {
                        const active = selectedTopic === topic;
                        return (
                            <button
                                key={topic}
                                onClick={() => setSelectedTopic(topic)}
                                className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${active
                                        ? "border-[#3CB371] bg-[#14452F] text-white"
                                        : "border-(--border-color) bg-(--bg-main) text-(--text-muted) hover:text-(--text-main)"
                                    }`}
                            >
                                {topic}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Statements Feed */}
            <div className="space-y-6">
                {filteredStatements.map((item) => (
                    <article
                        key={item.id}
                        className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-(--accent-emerald)/60 md:p-8"
                    >
                        {/* Top Metadata & Scholar Info */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-(--border-color) pb-4">
                            <div className="flex items-center gap-3.5">
                                <ScholarAvatar
                                    image={item.scholarImage}
                                    name={item.scholarName}
                                    englishName={item.scholarEnglishName}
                                    sizeClass="h-12 w-12 text-sm"
                                />
                                <div>
                                    <h3 className="text-sm font-bold text-(--text-main) md:text-base">
                                        {item.scholarName}
                                    </h3>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-(--text-muted)">
                                        <span className="inline-flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-(--accent-emerald)" />
                                            {item.date}
                                        </span>
                                        <span>•</span>
                                        <span>{item.sourceType}</span>
                                    </div>
                                </div>
                            </div>

                            <span className="rounded-md bg-(--badge-bg) px-2.5 py-1 text-xs font-semibold text-(--badge-text)">
                                {item.topic}
                            </span>
                        </div>

                        {/* Statement Title & Quote */}
                        <h2 className="mb-3 text-lg font-bold leading-snug text-(--accent-gold) md:text-xl">
                            {item.title}
                        </h2>

                        <blockquote className="mb-5 rounded-xl border-l-4 border-[#C59B27] bg-(--bg-main) p-4 md:p-5">
                            <Quote className="mb-2 h-4 w-4 text-(--accent-gold)" />
                            <p className="text-xs leading-relaxed text-(--text-main) md:text-sm">
                                “{item.fullStatement}”
                            </p>
                        </blockquote>

                        {/* Reference & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="inline-flex items-center gap-1.5 text-(--text-muted)">
                                <BookMarked className="h-4 w-4 shrink-0 text-(--accent-emerald)" />
                                <span>
                                    <strong className="text-(--text-main)">সূত্র:</strong>{" "}
                                    {item.referenceSource}
                                </span>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {item.videoUrl && (
                                    <a
                                        href={item.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-(--border-color) bg-(--bg-main) px-3.5 py-2 font-semibold text-(--text-main) transition hover:border-(--accent-emerald)"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 text-(--accent-gold)" />
                                        <span>মূল ভিডিও দেখুন</span>
                                    </a>
                                )}

                                <button
                                    onClick={() => handleCopy(item)}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#2E8B57]/60 bg-[#14452F] px-3.5 py-2 font-semibold text-white transition hover:bg-[#1b593d]"
                                >
                                    {copiedId === item.id ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-[#3CB371]" />
                                            <span>কপি হয়েছে</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5 text-[#C59B27]" />
                                            <span>উদ্ধৃতি কপি করুন</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
