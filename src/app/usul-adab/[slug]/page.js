import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, BookOpen } from "lucide-react";
import { usulAdabArticles } from "@/data/usulAdabData";

export async function generateStaticParams() {
    return usulAdabArticles.map((article) => ({
        slug: String(article.slug),
    }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const article = usulAdabArticles.find((item) => item.slug === slug);

    if (!article) {
        return {
            title: "প্রবন্ধ পাওয়া যায়নি",
        };
    }

    return {
        title: article.title,
        description: article.summary,
        openGraph: {
            title: article.title,
            description: article.summary,
            url: `https://manhajarchive.com/usul-adab/${article.slug}`,
            type: "article",
        },
    };
}

// ১. মূল সিনক্রোনাস পেজ কম্পোনেন্ট
export default function UsulArticleDetailPage({ params }) {
    return (
        <div className="min-h-screen bg-(--bg-main) text-(--text-main)">
            <Suspense fallback={<UsulArticleSkeleton />}>
                <UsulArticleContent params={params} />
            </Suspense>
        </div>
    );
}

// ২. আলাদা চাইল্ড কম্পোনেন্ট যেখানে params await করা হয়েছে
async function UsulArticleContent({ params }) {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    const article = usulAdabArticles.find((item) => item.slug === slug);

    if (!article) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        publisher: {
            "@type": "Organization",
            name: "Manhaj Archive",
            url: "https://manhajarchive.com",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://manhajarchive.com/usul-adab/${article.slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="mx-auto max-w-3xl px-4 py-12">
                <Link
                    href="/usul-adab"
                    className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#C59B27] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    সব প্রবন্ধে ফিরে যান
                </Link>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-(--text-muted)">
                    <span className="rounded bg-[#14452F]/10 dark:bg-[#14452F]/60 px-2.5 py-1 font-semibold text-[#3CB371]">
                        {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                    </span>
                </div>

                <h1 className="mb-6 text-2xl font-bold leading-snug md:text-4xl">
                    {article.title}
                </h1>

                <div className="mb-10 rounded-xl border-l-4 border-[#3CB371] bg-(--bg-card) p-5 text-sm leading-relaxed text-(--text-muted) md:text-base">
                    {article.summary}
                </div>

                <div className="space-y-8">
                    {article.sections.map((sec, idx) => (
                        <section key={idx}>
                            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-[#C59B27]">
                                <BookOpen className="h-5 w-5" />
                                {sec.heading}
                            </h2>
                            <p className="text-base leading-relaxed text-(--text-muted)">
                                {sec.content}
                            </p>
                        </section>
                    ))}
                </div>
            </article>
        </>
    );
}

// ৩. লোডিং স্কেলিটন ফলব্যাক
function UsulArticleSkeleton() {
    return (
        <div className="mx-auto max-w-3xl animate-pulse px-4 py-12 space-y-6">
            <div className="h-4 w-32 rounded bg-slate-800/60"></div>
            <div className="h-10 w-3/4 rounded bg-slate-800/60"></div>
            <div className="h-24 w-full rounded-xl bg-slate-800/40"></div>
            <div className="h-40 w-full rounded-xl bg-slate-800/40"></div>
        </div>
    );
}