"use client";

import { useState } from "react";
import {
    ShieldCheck,
    BookOpen,
    Scale,
    CheckCircle2,
    Send,
    FileCheck,
    AlertCircle,
} from "lucide-react";

const corePrinciples = [
    {
        title: "কুরআন ও সহীহ সুন্নাহর নিরঙ্কুশ অনুসরণ",
        description:
            "দ্বীনের প্রতিটি আকিদা, ইবাদত ও মানহাজগত বিষয়ে একমাত্র চূড়ান্ত প্রমাণ হলো আল-কুরআন এবং রাসূলুল্লাহ (সা.)-এর সহীহ ও প্রমাণিত সুন্নাহ।",
    },
    {
        title: "সালাফে সালেহীনদের বুঝ ও ব্যাখ্যা",
        description:
            "নিজস্ব যুক্তি, আবেগ বা আধুনিক কোনো মতবাদের পরিবর্তে সাহাবায়ে কেরাম, তাবেয়ী এবং প্রথম তিন শ্রেষ্ঠ যুগের ইমামদের সর্বসম্মত ব্যাখ্যাকেই মানদণ্ড ধরা হয়।",
    },
    {
        title: "দলাদলি ও চরমপন্থা থেকে মুক্ত অবস্থান",
        description:
            "আমরা কোনো ব্যক্তি বা দলের অন্ধ তাকলিদ করি না; একইসাথে প্রাজ্ঞ সালাফি আলেমদের ইজতিহাদি ভুলের কারণে তাঁদের তুচ্ছ-তাচ্ছিল্য বা বিদআতি ফতোয়া দেওয়ার হাদ্দাদী প্রবণতা কঠোরভাবে প্রত্যাখ্যান করি।",
    },
    {
        title: "তাহকীক ও নির্ভুল রেফারেন্স যাচাই",
        description:
            "এই আর্কাইভে প্রকাশিত প্রতিটি ফতোয়া, কিতাবের উদ্ধৃতি এবং সতর্কবার্তা মূল আরবি উৎস ও প্রাজ্ঞ আলেমদের নির্ভরযোগ্য বক্তব্য থেকে যাচাই করে প্রকাশ করা হয়।",
    },
];

export default function MethodologyPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C59B27]/30 bg-[#14452F]/40 px-4 py-1 text-xs font-medium text-[#C59B27]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>আমাদের মূলনীতি ও ইলমি অঙ্গীকার</span>
                </div>
                <h1 className="mb-4 text-3xl font-bold text-(--text-main) md:text-4xl">
                    মানহাজ ও বিশ্বাস নীতিমালা
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-(--text-muted) md:text-base">
                    Manhaj Archive কোনো দলীয় বা বাণিজ্যিক প্ল্যাটফর্ম নয়। এটি বিশুদ্ধ তাওহীদ, সহীহ সুন্নাহ এবং সালাফে সালেহীনদের অনুসৃত মধ্যমপন্থী মানহাজ প্রচার ও সংরক্ষণের একটি উন্মুক্ত গবেষণা আর্কাইভ।
                </p>
            </div>

            {/* 4 Core Principles */}
            <section className="mb-16 grid gap-6 md:grid-cols-2">
                {corePrinciples.map((item, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-[#2E8B57]/60"
                    >
                        <div className="mb-3 flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14452F] text-xs font-bold text-[#C59B27]">
                                {idx + 1}
                            </span>
                            <h2 className="text-lg font-bold text-(--text-main)">
                                {item.title}
                            </h2>
                        </div>
                        <p className="text-xs leading-relaxed text-(--text-muted) md:text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </section>

            {/* Editorial Verification Standards */}
            <section className="mb-16 rounded-2xl border border-[#C59B27]/30 bg-(--bg-card) p-6 md:p-8">
                <div className="mb-5 flex items-center gap-2.5">
                    <Scale className="h-6 w-6 text-[#C59B27]" />
                    <h2 className="text-xl font-bold text-(--text-main)">
                        তথ্য ও রেফারেন্স যাচাইয়ের মানদণ্ড
                    </h2>
                </div>
                <ul className="space-y-3 text-xs leading-relaxed text-(--text-muted) md:text-sm">
                    <li className="flex items-start gap-2.5">
                        <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3CB371]" />
                        <span>
                            হাদিস উদ্ধৃতির ক্ষেত্রে সহীহ বুখারী, সহীহ মুসলিম এবং শাইখ আলবানী (রাহিমাহুল্লাহ)-সহ নির্ভরযোগ্য মুহাদ্দিসগণের তাহকীক অনুসরণ করা হয়।
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3CB371]" />
                        <span>
                            সমসাময়িক ফিতনা বা অপপ্রচারের জবাবে আবেগপ্রসূত মন্তব্য পরিহার করে সরাসরি প্রাজ্ঞ আলেমদের তারিখসহ মূল বক্তব্য ও কিতাবের পৃষ্ঠা নম্বর উল্লেখ করা হয়।
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C59B27]" />
                        <span>
                            আমাদের কোনো প্রবন্ধ বা অনুবাদে অনিচ্ছাকৃত ভুল নজরে এলে নিচের ফর্মের মাধ্যমে দলিলসহ জানালে তা দ্রুত সংশোধন করা হয়।
                        </span>
                    </li>
                </ul>
            </section>

            {/* Reference Contribution / Error Report Form */}
            <section className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 md:p-8">
                <div className="mb-6">
                    <h2 className="mb-1 text-xl font-bold text-(--text-main)">
                        রেফারেন্স যুক্ত করুন বা সংশোধনী পাঠান
                    </h2>
                    <p className="text-xs text-(--text-muted)">
                        প্রাজ্ঞ আলেমদের নির্ভরযোগ্য কোনো বক্তব্য, কিতাবের উদ্ধৃতি অথবা সাইটের কোনো ভুল সংশোধনের জন্য আমাদের জানান।
                    </p>
                </div>

                {submitted ? (
                    <div className="rounded-xl border border-[#2E8B57] bg-[#14452F]/30 p-6 text-center">
                        <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-[#3CB371]" />
                        <h3 className="text-base font-bold text-(--text-main)">
                            জাযাকাল্লাহু খাইরান!
                        </h3>
                        <p className="mt-1 text-xs text-(--text-muted)">
                            আপনার পাঠানো তথ্য ও রেফারেন্স গৃহীত হয়েছে। তাহকীক টিম যাচাই করে শীঘ্রই তা আর্কাইভে যুক্ত করবে।
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                                    তথ্যের ধরন
                                </label>
                                <select className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) px-3.5 py-2.5 text-sm text-(--text-main) focus:border-[#2E8B57] focus:outline-none">
                                    <option>নতুন কিতাব / ফতোয়ার রেফারেন্স</option>
                                    <option>প্রাজ্ঞ আলেমের বক্তব্য / ভিডিও লিংক</option>
                                    <option>বানান বা তথ্যগত সংশোধনী</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                                    আপনার নাম (ঐচ্ছিক)
                                </label>
                                <input
                                    type="text"
                                    placeholder="যেমন: আব্দুল্লাহ"
                                    className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) px-3.5 py-2.5 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-[#2E8B57] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                                কিতাবের নাম, খণ্ড/পৃষ্ঠা বা ভিডিওর মূল লিংক
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="উদাহরণ: সিয়ারু আ'লামিন নুবালা ১৪/৩৭৬ অথবা ইউটিউব লিংক..."
                                className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) px-3.5 py-2.5 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-[#2E8B57] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                                বিস্তারিত বিবরণ
                            </label>
                            <textarea
                                required
                                rows={4}
                                placeholder="উদ্ধৃতি বা সংশোধনীর বিস্তারিত লিখুন..."
                                className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-3.5 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-[#2E8B57] focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-xl border border-[#2E8B57]/60 bg-[#14452F] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1b593d]"
                        >
                            <Send className="h-3.5 w-3.5 text-[#C59B27]" />
                            <span>জমা দিন</span>
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
}