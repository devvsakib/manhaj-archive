import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    AlertTriangle,
    BookOpen,
    Quote,
    ShieldCheck,
    Clock,
    Calendar,
} from "lucide-react";
import { alertsData } from "@/data/alertsData";
import FactCardGenerator from "@/components/FactCardGenerator";

// সব স্ট্যাটিক পাথ জেনারেট করার জন্য
export async function generateStaticParams() {
    return alertsData.map((alert) => ({
        slug: String(alert.slug),
    }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const alert = alertsData.find((item) => item.slug === slug);

    if (!alert) {
        return {
            title: "আর্টিকেল পাওয়া যায়নি",
        };
    }

    return {
        title: alert.title,
        description: alert.summary,
        openGraph: {
            title: alert.title,
            description: alert.summary,
            url: `https://manhajarchive.com/alerts/${alert.slug}`,
            type: "article",
        },
    };
}

// ১. মূল পেজ কম্পোনেন্ট (সিনক্রোনাস, যা Suspense বাউন্ডারি প্রদান করে)
export default function AlertDetailPage({ params }) {
    return (
        <div className="min-h-screen bg-(--bg-main) text-(--text-main)">
            <Suspense fallback={<ArticleSkeleton />}>
                <AlertContent params={params} />
            </Suspense>
        </div>
    );
}

// ২. আলাদা চাইল্ড কম্পোনেন্ট যেখানে params await করা হয়েছে
async function AlertContent({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const alert = alertsData.find((item) => item.slug === slug);

    if (!alert) {
        notFound();
    }

    // Google Rich Snippet JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: alert.title,
        description: alert.summary,
        publisher: {
            "@type": "Organization",
            name: "Manhaj Archive",
            url: "https://manhajarchive.com",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://manhajarchive.com/alerts/${alert.slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="mx-auto max-w-3xl px-4 py-12">
                <Link
                    href="/alerts"
                    className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#C59B27] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    সব ফিতনা ওভারভিউতে ফিরে যান
                </Link>

                {/* Status & Meta Info */}
                <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-800/50 bg-red-950/80 px-3 py-1 font-semibold text-red-400">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {alert.status}
                    </span>
                    <span className="rounded-full border border-[#C59B27]/30 bg-[#14452F]/30 px-3 py-1 font-medium text-[#C59B27]">
                        {alert.category}
                    </span>
                    <span className="flex items-center gap-1 text-(--text-muted)">
                        <Calendar className="h-3.5 w-3.5" />
                        {alert.date}
                    </span>
                    <span className="flex items-center gap-1 text-(--text-muted)">
                        <Clock className="h-3.5 w-3.5" />
                        {alert.readTime}
                    </span>
                </div>

                {/* Article Title */}
                <h1 className="mb-6 text-2xl font-bold leading-snug md:text-4xl">
                    {alert.title}
                </h1>

                {/* Summary Box */}
                <div className="mb-10 rounded-xl border-l-4 border-[#C59B27] bg-(--bg-card) p-5 text-base leading-relaxed text-(--text-muted)">
                    {alert.summary}
                </div>

                {/* Section 1: The Claims / Misconceptions */}
                <section className="mb-10">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                        বিভ্রান্তি বা অপপ্রচারের স্বরূপ
                    </h2>
                    <div className="rounded-xl border border-red-900/30 bg-[#161313] p-6">
                        <ul className="space-y-3 text-sm leading-relaxed text-slate-300 md:text-base">
                            {alert.claims.map((claim, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
                                    <span>{claim}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Section 2: Scholarly Clarification & Evidence */}
                <section className="mb-10">
                    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#3CB371]">
                        <ShieldCheck className="h-6 w-6" />
                        কুরআন, সুন্নাহ ও সালাফদের মূলনীতির আলোকে জবাব
                    </h2>
                    <div className="space-y-5">
                        {alert.clarifications.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-6"
                            >
                                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#C59B27]">
                                    <BookOpen className="h-4 w-4" />
                                    {index + 1}. {item.point}
                                </h3>
                                <p className="text-sm leading-relaxed text-(--text-muted) md:text-base">
                                    {item.evidence}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Quotes from Scholars */}
                {alert.scholarsQuotes && alert.scholarsQuotes.length > 0 && (
                    <section className="mb-10">
                        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
                            <Quote className="h-5 w-5 text-[#C59B27]" />
                            প্রাজ্ঞ উলামায়ে কেরামের বক্তব্য ও সতর্কবার্তা
                        </h2>
                        <div className="space-y-4">
                            {alert.scholarsQuotes.map((q, index) => (
                                <blockquote
                                    key={index}
                                    className="rounded-xl border border-(--border-color) bg-(--bg-subtle) p-6"
                                >
                                    <p className="mb-3 text-base italic leading-relaxed">
                                        "{q.quote}"
                                    </p>
                                    <footer className="text-xs font-semibold text-[#3CB371]">
                                        {q.scholar}{" "}
                                        <span className="font-normal text-(--text-muted)">
                                            ({q.source})
                                        </span>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </section>
                )}

                {/* Shareable Fact Card Generator */}
                <FactCardGenerator alert={alert} />
            </main>
        </>
    );
}

// ৩. ইনস্ট্যান্ট লোডিং স্কেলিটন ফলব্যাক
function ArticleSkeleton() {
    return (
        <div className="mx-auto max-w-3xl animate-pulse px-4 py-12 space-y-6">
            <div className="h-4 w-32 rounded bg-slate-800/60"></div>
            <div className="h-10 w-3/4 rounded bg-slate-800/60"></div>
            <div className="h-24 w-full rounded-xl bg-slate-800/40"></div>
            <div className="h-48 w-full rounded-xl bg-slate-800/40"></div>
        </div>
    );
}