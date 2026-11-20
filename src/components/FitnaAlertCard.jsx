import Link from "next/link";
import { AlertTriangle, BookOpen, ArrowUpRight, Clock } from "lucide-react";

export default function FitnaAlertCard({ alert }) {
    const isHighSeverity = alert.severity === "high";

    return (
        <article className="group relative flex flex-col justify-between rounded-xl border border-(--border-color) bg-(--bg-card) p-6 transition-all duration-300 hover:border-[#2E8B57]/60 hover:shadow-lg hover:shadow-[#2E8B57]/10">
            <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isHighSeverity
                            ? "bg-red-950/80 text-red-400 border border-red-800/50"
                            : "bg-amber-950/80 text-amber-400 border border-amber-800/50"
                            }`}
                    >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {alert.status}
                    </span>
                    <span className="text-xs font-medium text-[#C59B27]">
                        {alert.category}
                    </span>
                </div>

                <Link href={`/alerts/${alert.slug}`}>
                    <h3 className="mb-3 text-xl font-bold leading-snug text-(--text-main) transition-colors group-hover:text-[#3CB371]">
                        {alert.title}
                    </h3>
                </Link>

                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-(--text-muted)">
                    {alert.summary}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-(--border-color)/80 pt-4 text-xs text-(--text-muted)">
                <div className="flex items-center gap-4">
                    <span>{alert.date}</span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {alert.readTime}
                    </span>
                </div>

                <Link
                    href={`/alerts/${alert.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#C59B27] transition-transform group-hover:translate-x-0.5"
                >
                    দলিলসহ পড়ুন
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>
        </article>
    );
}