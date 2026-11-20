import Link from "next/link";
import { Scale, Clock, ArrowRight } from "lucide-react";
import { usulAdabArticles } from "@/data/usulAdabData";

export const metadata = {
    title: "উসূল ও আদব",
    description: "ইলম অর্জনের সঠিক পদ্ধতি, উলামাদের মর্যাদা এবং মতবিরোধের আদব বিষয়ক প্রবন্ধসমূহ।",
};

export default function UsulAdabPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="mb-12 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C59B27]/30 bg-[#14452F]/10 dark:bg-[#14452F]/40 px-4 py-1 text-xs font-medium text-[#C59B27]">
                    <Scale className="h-3.5 w-3.5" />
                    <span>প্রবন্ধ ও স্টাডি হাব</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    উসূল ও আদব
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-(--text-muted) md:text-base">
                    দ্বীনের সঠিক বুঝ, সালাফে সালেহীনদের আদব এবং মতবিরোধ মোকাবিলার মূলনীতি বিষয়ক বিস্তারিত প্রবন্ধ।
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {usulAdabArticles.map((article) => (
                    <article
                        key={article.id}
                        className="flex flex-col justify-between rounded-xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-[#2E8B57]/60"
                    >
                        <div>
                            <div className="mb-3 flex items-center justify-between text-xs">
                                <span className="rounded bg-[#14452F]/10 dark:bg-[#14452F]/60 px-2.5 py-1 font-semibold text-[#3CB371]">
                                    {article.category}
                                </span>
                                <span className="flex items-center gap-1 text-(--text-muted)">
                                    <Clock className="h-3.5 w-3.5" />
                                    {article.readTime}
                                </span>
                            </div>

                            <Link href={`/usul-adab/${article.slug}`}>
                                <h2 className="mb-3 text-xl font-bold leading-snug text-(--text-main) hover:text-[#3CB371] transition">
                                    {article.title}
                                </h2>
                            </Link>

                            <p className="text-sm leading-relaxed text-(--text-muted)">
                                {article.summary}
                            </p>
                        </div>

                        <div className="mt-6 border-t border-(--border-color)/80 pt-4 flex items-center justify-between text-xs">
                            <span className="text-slate-500">{article.date}</span>
                            <Link
                                href={`/usul-adab/${article.slug}`}
                                className="inline-flex items-center gap-1 font-semibold text-[#C59B27] hover:underline"
                            >
                                পূর্ণাঙ্গ প্রবন্ধ পড়ুন
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}