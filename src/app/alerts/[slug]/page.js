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
    UserX,
    XCircle,
    CheckCircle2,
    Compass,
    FileWarning,
} from "lucide-react";
import { alertsData } from "@/data/alertsData";
import FactCardGenerator from "@/components/FactCardGenerator";
import ScholarAvatar from "@/components/ScholarAvatar";

export async function generateStaticParams() {
    return alertsData.map((alert) => ({
        slug: String(alert.slug),
    }));
}

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

export default function AlertDetailPage({ params }) {
    return (
        <div className="min-h-screen bg-(--bg-main) text-(--text-main)">
            <Suspense fallback={<ArticleSkeleton />}>
                <AlertContent params={params} />
            </Suspense>
        </div>
    );
}

async function AlertContent({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const alert = alertsData.find((item) => item.slug === slug);

    if (!alert) {
        notFound();
    }

    const isHighSeverity = alert.severity === "high";

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

            <div className="relative overflow-hidden border-b border-(--border-color) bg-(--bg-subtle) py-10 md:py-14">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(#2E8B57_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
                />

                <div className="relative mx-auto max-w-6xl px-4">
                    <Link
                        href="/alerts"
                        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-card) px-3.5 py-2 text-xs font-semibold text-(--accent-gold) transition hover:border-(--accent-emerald)"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>সব ফিতনা ওভারভিউতে ফিরে যান</span>
                    </Link>

                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-bold ${isHighSeverity
                                    ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                                    : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                }`}
                        >
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {alert.status}
                        </span>

                        <span className="rounded-full border border-(--pill-border) bg-(--pill-bg) px-3 py-1 font-semibold text-(--accent-gold)">
                            {alert.category}
                        </span>

                        <span className="inline-flex items-center gap-1 text-(--text-muted)">
                            <Calendar className="h-3.5 w-3.5 text-(--accent-gold)" />
                            {alert.date}
                        </span>

                        <span className="inline-flex items-center gap-1 text-(--text-muted)">
                            <Clock className="h-3.5 w-3.5 text-(--accent-emerald)" />
                            {alert.readTime}
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-2xl font-extrabold leading-tight text-(--text-main) md:text-4xl lg:text-[40px]">
                        {alert.title}
                    </h1>
                </div>
            </div>

            <main className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="space-y-10 lg:col-span-8">
                        <div className="rounded-2xl border border-(--border-color) border-l-4 border-l-(--accent-gold) bg-(--bg-card) p-6 shadow-xs">
                            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-(--accent-gold)">
                                সারসংক্ষেপ ও প্রেক্ষাপট
                            </p>
                            <p className="text-sm leading-relaxed text-(--text-main) md:text-base">
                                {alert.summary}
                            </p>
                        </div>

                        {(alert.originSummary || alert.propagators?.length > 0) && (
                            <section id="origin" className="scroll-mt-24">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400">
                                        <UserX className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-(--text-main)">
                                            ফিতনার উৎপত্তি ও প্রধান প্রচারকবৃন্দ
                                        </h2>
                                        <p className="text-xs text-(--text-muted)">
                                            যাদের মাধ্যমে এই বিভ্রান্তিকর বক্তব্য ও মানহাজ ছড়িয়ে পড়ছে
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-red-500/25 bg-(--bg-card) p-6">
                                    {alert.originSummary && (
                                        <p className="mb-6 rounded-xl border border-(--border-color) bg-(--bg-main) p-4 text-sm leading-relaxed text-(--text-muted)">
                                            {alert.originSummary}
                                        </p>
                                    )}

                                    {alert.propagators?.length > 0 && (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {alert.propagators.map((person, index) => (
                                                <div
                                                    key={index}
                                                    className="group flex flex-col justify-between rounded-2xl border border-(--border-color) bg-(--bg-main) p-5 transition hover:border-red-500/40"
                                                >
                                                    <div className="mb-3 flex items-center gap-3.5">
                                                        <ScholarAvatar
                                                            image={person.image}
                                                            name={person.name}
                                                            englishName={person.englishName}
                                                            sizeClass="h-24 w-24 text-lg"
                                                        />
                                                        <div className="min-w-0">
                                                            <span className="mb-1 inline-block rounded-md border border-red-500/25 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
                                                                {person.role}
                                                            </span>
                                                            <h3 className="text-base font-bold text-(--text-main)">
                                                                {person.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <p className="border-t border-(--border-color) pt-3 text-xs leading-relaxed text-(--text-muted)">
                                                        {person.note}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        <section id="claims" className="scroll-mt-24">
                            <div className="mb-4 flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400">
                                    <FileWarning className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-(--text-main)">
                                        প্রচারিত ভ্রান্ত দাবি ও অপপ্রচারের স্বরূপ
                                    </h2>
                                    <p className="text-xs text-(--text-muted)">
                                        সাধারণ তরুণদের বিভ্রান্ত করতে যেসব যুক্তি বা দাবি পেশ করা হয়
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 md:p-6">
                                {alert.claims.map((claim, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3.5 rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                                    >
                                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                                        <p className="text-sm leading-relaxed text-(--text-main) md:text-base">
                                            {claim}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="clarifications" className="scroll-mt-24">
                            <div className="mb-5 flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--accent-emerald)/30 bg-(--badge-bg) text-(--accent-emerald)">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-(--text-main)">
                                        কুরআন, সুন্নাহ ও সালাফদের মূলনীতির আলোকে জবাব
                                    </h2>
                                    <p className="text-xs text-(--text-muted)">
                                        প্রামাণ্য দলিল ও সালাফে সালেহীনদের মানহাজ অনুযায়ী খণ্ডন
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {alert.clarifications.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-(--accent-emerald)/60"
                                    >
                                        <div className="mb-3 flex items-start gap-3">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--badge-bg) text-xs font-extrabold text-(--accent-emerald)">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-base font-bold leading-snug text-(--accent-gold) md:text-lg">
                                                {item.point}
                                            </h3>
                                        </div>
                                        <p className="pl-10 text-sm leading-relaxed text-(--text-muted) md:text-base">
                                            {item.evidence}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {alert.scholarsQuotes && alert.scholarsQuotes.length > 0 && (
                            <section id="quotes" className="scroll-mt-24">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--pill-border) bg-(--pill-bg) text-(--accent-gold)">
                                        <Quote className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-(--text-main)">
                                            প্রাজ্ঞ উলামায়ে কেরামের বক্তব্য ও সতর্কবার্তা
                                        </h2>
                                        <p className="text-xs text-(--text-muted)">
                                            পূর্ববর্তী ও সমসাময়িক নির্ভরযোগ্য ইমামদের ফতোয়া
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {alert.scholarsQuotes.map((q, index) => (
                                        <blockquote
                                            key={index}
                                            className="rounded-2xl border border-(--border-color) border-l-4 border-l-(--accent-gold) bg-(--bg-subtle) p-6"
                                        >
                                            <p className="mb-3 text-base italic leading-relaxed text-(--text-main)">
                                                &ldquo;{q.quote}&rdquo;
                                            </p>
                                            <footer className="flex flex-wrap items-center gap-2 text-xs font-bold text-(--accent-emerald)">
                                                <BookOpen className="h-3.5 w-3.5" />
                                                <span>{q.scholar}</span>
                                                <span className="font-normal text-(--text-muted)">
                                                    ({q.source})
                                                </span>
                                            </footer>
                                        </blockquote>
                                    ))}
                                </div>
                            </section>
                        )}

                        <FactCardGenerator alert={alert} />
                    </div>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            <div className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-5">
                                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-(--accent-gold)">
                                    <Compass className="h-4 w-4" />
                                    <span>পর্যালোচনা সূচিপত্র</span>
                                </h3>
                                <nav className="flex flex-col space-y-1.5 text-xs font-medium">
                                    {(alert.originSummary || alert.propagators?.length > 0) && (
                                        <a
                                            href="#origin"
                                            className="flex items-center justify-between rounded-xl px-3 py-2 text-(--text-muted) transition hover:bg-(--bg-subtle) hover:text-(--text-main)"
                                        >
                                            <span>১. উৎপত্তি ও প্রচারকবৃন্দ</span>
                                            <span className="text-[10px] text-red-500">●</span>
                                        </a>
                                    )}
                                    <a
                                        href="#claims"
                                        className="flex items-center justify-between rounded-xl px-3 py-2 text-(--text-muted) transition hover:bg-(--bg-subtle) hover:text-(--text-main)"
                                    >
                                        <span>২. প্রচারিত ভ্রান্ত দাবি</span>
                                        <span className="rounded bg-(--bg-main) px-1.5 py-0.5 text-[10px]">
                                            {alert.claims?.length || 0}
                                        </span>
                                    </a>
                                    <a
                                        href="#clarifications"
                                        className="flex items-center justify-between rounded-xl px-3 py-2 text-(--text-muted) transition hover:bg-(--bg-subtle) hover:text-(--text-main)"
                                    >
                                        <span>৩. কুরআন-সুন্নাহর জবাব</span>
                                        <span className="rounded bg-(--badge-bg) px-1.5 py-0.5 text-[10px] text-(--accent-emerald)">
                                            {alert.clarifications?.length || 0}
                                        </span>
                                    </a>
                                    {alert.scholarsQuotes?.length > 0 && (
                                        <a
                                            href="#quotes"
                                            className="flex items-center justify-between rounded-xl px-3 py-2 text-(--text-muted) transition hover:bg-(--bg-subtle) hover:text-(--text-main)"
                                        >
                                            <span>৪. উলামাদের বক্তব্য</span>
                                            <span className="rounded bg-(--bg-main) px-1.5 py-0.5 text-[10px]">
                                                {alert.scholarsQuotes.length}
                                            </span>
                                        </a>
                                    )}
                                </nav>
                            </div>

                            {alert.propagators?.length > 0 && (
                                <div className="rounded-2xl border border-red-500/25 bg-(--bg-card) p-5">
                                    <h3 className="mb-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                                        <UserX className="h-4 w-4" />
                                        <span>চিহ্নিত প্রচারক ও উৎস</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {alert.propagators.map((person, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 rounded-xl border border-(--border-color) bg-(--bg-main) p-3"
                                            >
                                                <ScholarAvatar
                                                    image={person.image}
                                                    name={person.name}
                                                    englishName={person.englishName}
                                                    sizeClass="h-11 w-11 text-xs"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate text-xs font-bold text-(--text-main)">
                                                        {person.name}
                                                    </p>
                                                    <p className="truncate text-[10px] text-(--text-muted)">
                                                        {person.role}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="rounded-2xl border border-(--border-color) bg-(--bg-subtle) p-5 text-xs leading-relaxed text-(--text-muted)">
                                <div className="mb-2 flex items-center gap-1.5 font-bold text-(--accent-emerald)">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>মানহাজ আর্কাইভ নীতিমালা</span>
                                </div>
                                <p>
                                    আমরা কোনো ব্যক্তির ব্যক্তিগত সমালোচনা নয়, বরং কুরআন, সহীহ হাদিস ও সালাফে সালেহীনদের মূলনীতির বিপরীতে প্রচারিত ভ্রান্ত মতবাদ স্পষ্ট করি।
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

function ArticleSkeleton() {
    return (
        <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-12">
            <div className="h-4 w-36 rounded bg-(--bg-card)" />
            <div className="h-14 w-3/4 rounded-2xl bg-(--bg-card)" />
            <div className="grid gap-8 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-8">
                    <div className="h-32 rounded-2xl bg-(--bg-card)" />
                    <div className="h-64 rounded-2xl bg-(--bg-card)" />
                </div>
                <div className="h-80 rounded-2xl bg-(--bg-card) lg:col-span-4" />
            </div>
        </div>
    );
}