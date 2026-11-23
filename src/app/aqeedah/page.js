"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Compass,
    BookOpen,
    CheckCircle2,
    Circle,
    Scale,
    XCircle,
    CheckCircle,
    ArrowRight,
    Clock,
    Sparkles,
} from "lucide-react";
import { aqeedahModules, aqeedahComparisonList } from "@/data/aqeedahData";

export default function AqeedahManhajPage() {
    const [selectedPillar, setSelectedPillar] = useState("সব পাঠ");
    const [completedIds, setCompletedIds] = useState([]);

    const pillars = [
        "সব পাঠ",
        "তাওহীদের মূলনীতি",
        "সালাফদের মানহাজ",
        "মধ্যমপন্থা ও ভারসাম্য",
    ];

    // ইউজারের পঠিত পাঠগুলো লোকাল স্টোরেজ থেকে লোড করা
    useEffect(() => {
        const saved = localStorage.getItem("completedAqeedahLessons");
        if (saved) {
            setCompletedIds(JSON.parse(saved));
        }
    }, []);

    const toggleComplete = (id) => {
        let updated;
        if (completedIds.includes(id)) {
            updated = completedIds.filter((item) => item !== id);
        } else {
            updated = [...completedIds, id];
        }
        setCompletedIds(updated);
        localStorage.setItem("completedAqeedahLessons", JSON.stringify(updated));
    };

    const filteredModules =
        selectedPillar === "সব পাঠ"
            ? aqeedahModules
            : aqeedahModules.filter((m) => m.pillar === selectedPillar);

    const progressPercentage = Math.round(
        (completedIds.length / aqeedahModules.length) * 100
    );

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-12 rounded-2xl border border-(--border-color) bg-(--bg-card) p-8 md:p-10">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div className="max-w-2xl">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                            <Compass className="h-3.5 w-3.5" />
                            <span>মৌলিক আকিদা ও মানহাজ স্টাডি হাব</span>
                        </div>
                        <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                            আকিদা ও সালাফি মানহাজ
                        </h1>
                        <p className="text-sm leading-relaxed text-(--text-muted) md:text-base">
                            বিশুদ্ধ আকিদা এবং সালাফে সালেহীনদের অনুসৃত মানহাজ ধাপে ধাপে অধ্যয়নের জন্য কাঠামোবদ্ধ পাঠক্রম। প্রতিটি পাঠে মূল কুরআনিক দলিল, ব্যাখ্যা এবং প্রচলিত বিভ্রান্তির নিরসন যুক্ত করা হয়েছে।
                        </p>
                    </div>

                    <div className="w-full shrink-0 rounded-xl border border-[#2E8B57]/40 bg-(--bg-main) p-5 lg:w-72">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                            <span className="text-(--text-muted)">আপনার অধ্যয়ন অগ্রগতি</span>
                            <span className="text-[#3CB371]">{progressPercentage}%</span>
                        </div>
                        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                            <div
                                className="h-full bg-[#3CB371] transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-[11px] text-(--text-muted)">
                            মোট {aqeedahModules.length}টি মৌলিক পাঠের মধ্যে {completedIds.length}টি সম্পন্ন হয়েছে
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-2">
                {pillars.map((pillar) => (
                    <button
                        key={pillar}
                        onClick={() => setSelectedPillar(pillar)}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${selectedPillar === pillar
                            ? "bg-[#14452F] text-white border border-[#2E8B57]"
                            : "bg-(--bg-card) text-(--text-muted) border border-(--border-color) hover:text-(--text-main)"
                            }`}
                    >
                        {pillar}
                    </button>
                ))}
            </div>

            <div className="space-y-8 mb-16">
                {filteredModules.map((mod) => {
                    const isCompleted = completedIds.includes(mod.id);
                    return (
                        <article
                            key={mod.id}
                            className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-[#2E8B57]/60 md:p-8"
                        >
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-(--border-color) pb-4 text-xs">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="rounded bg-[#14452F]/10 dark:bg-[#14452F]/60 px-2.5 py-1 font-semibold text-[#3CB371]">
                                        {mod.level}
                                    </span>
                                    <span className="font-medium text-[#C59B27]">{mod.pillar}</span>
                                    <span className="flex items-center gap-1 text-(--text-muted)">
                                        <Clock className="h-3.5 w-3.5" />
                                        {mod.readTime}
                                    </span>
                                </div>

                                <button
                                    onClick={() => toggleComplete(mod.id)}
                                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${isCompleted
                                        ? "bg-[#14452F] text-[#3CB371] border border-[#2E8B57]"
                                        : "bg-(--bg-main) text-(--text-muted) border border-(--border-color) hover:text-(--text-main)"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>পঠিত</span>
                                        </>
                                    ) : (
                                        <>
                                            <Circle className="h-4 w-4" />
                                            <span>পঠিত চিহ্নিত করুন</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <h2 className="mb-3 text-xl font-bold text-(--text-main) md:text-2xl">
                                {mod.title}
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-(--text-muted) md:text-base">
                                {mod.summary}
                            </p>

                            <div className="mb-6 rounded-xl border border-[#C59B27]/30 bg-(--bg-main) p-5 text-center">
                                <p
                                    dir="rtl"
                                    className="mb-3 text-2xl font-bold leading-loose text-[#C59B27] md:text-3xl"
                                >
                                    {mod.arabicVerse}
                                </p>
                                <p className="text-xs italic text-(--text-muted) md:text-sm">
                                    "{mod.verseTranslation}"
                                </p>
                            </div>

                            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {mod.keyConcepts.map((concept, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-(--border-color) bg-[var(--bg-subtle)] p-4"
                                    >
                                        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-[#3CB371]">
                                            <BookOpen className="h-4 w-4 shrink-0" />
                                            <span>{concept.subtitle}</span>
                                        </h3>
                                        <p className="text-xs leading-relaxed text-(--text-muted)">
                                            {concept.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-4 rounded-xl border border-(--border-color) bg-(--bg-main) p-4 md:grid-cols-2">
                                <div className="flex items-start gap-2.5 text-xs">
                                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                                    <div>
                                        <span className="font-bold text-red-400">প্রচলিত ভুল ধারণা: </span>
                                        <span className="text-(--text-muted)">
                                            {mod.misconceptionVsTruth.misconception}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5 text-xs">
                                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#3CB371]" />
                                    <div>
                                        <span className="font-bold text-[#3CB371]">সালাফি অবস্থান: </span>
                                        <span className="text-(--text-muted)">
                                            {mod.misconceptionVsTruth.truth}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <section className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 md:p-8">
                <div className="mb-6 flex items-center gap-2.5">
                    <Scale className="h-6 w-6 text-[#C59B27]" />
                    <div>
                        <h2 className="text-xl font-bold text-(--text-main) md:text-2xl">
                            মানহাজ তুলনামূলক সারণি: বিচ্যুতি বনাম আহলুস সুন্নাহর মূলনীতি
                        </h2>
                        <p className="text-xs text-(--text-muted)">
                            সঠিক মানহাজ এবং প্রান্তিক অবস্থানের পার্থক্য সহজে বোঝার জন্য সংক্ষিপ্ত তুলনা
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs md:text-sm">
                        <thead>
                            <tr className="border-b border-(--border-color) bg-(--bg-main) text-(--text-main)">
                                <th className="p-4 font-bold">মৌলিক বিষয়</th>
                                <th className="p-4 font-bold text-red-400">প্রান্তিক ও বিচ্যুত অবস্থান</th>
                                <th className="p-4 font-bold text-[#3CB371]">আহলুস সুন্নাহর অনুসৃত মানহাজ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {aqeedahComparisonList.map((row, index) => (
                                <tr key={index} className="hover:bg-[var(--bg-subtle)]/50">
                                    <td className="p-4 font-semibold text-(--text-main)">
                                        {row.topic}
                                    </td>
                                    <td className="p-4 text-(--text-muted)">{row.deviation}</td>
                                    <td className="p-4 text-(--text-main)">{row.sunnahWay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <Link className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C59B27] hover:underline" href="/usul-adab">
                        উসূল ও আদব বিষয়ক বিস্তারিত প্রবন্ধ পড়ুন
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}