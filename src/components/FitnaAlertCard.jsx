import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Calendar,
  XCircle,
  Radio,
} from "lucide-react";
import ScholarAvatar from "@/components/ScholarAvatar";

export default function FitnaAlertCard({ alert }) {
  const isHighSeverity = alert.severity === "high";
  const propagators = alert.propagators || [];
  const mainPropagator = propagators[0];

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-(--border-color) bg-(--bg-card) transition-all duration-300 hover:-translate-y-1.5 hover:border-(--accent-emerald)/70 hover:shadow-2xl">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${
          isHighSeverity ? "bg-red-500/15" : "bg-amber-500/15"
        }`}
      />

      <div>
        <div className="flex items-center justify-between gap-2 border-b border-(--border-color)/70 bg-(--bg-subtle) px-6 py-3.5">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${
              isHighSeverity
                ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  isHighSeverity ? "bg-red-500" : "bg-amber-500"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isHighSeverity ? "bg-red-500" : "bg-amber-500"
                }`}
              />
            </span>
            {alert.status}
          </span>

          <span className="rounded-lg border border-(--border-color) bg-(--bg-card) px-2.5 py-1 text-[11px] font-semibold text-(--accent-gold)">
            {alert.category}
          </span>
        </div>

        <div className="p-6">
          {propagators.length > 0 && (
            <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-linear-to-r from-red-500/8 via-(--bg-main) to-(--bg-main) p-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <ScholarAvatar
                    image={mainPropagator.image}
                    name={mainPropagator.name}
                    englishName={mainPropagator.englishName}
                    sizeClass="h-12 w-12 text-sm"
                  />
                  <span
                    title="সতর্কতা চিহ্নিত"
                    className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-(--bg-main) bg-red-500 text-white"
                  >
                    <AlertTriangle className="h-2.5 w-2.5" />
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    উৎপত্তি / প্রধান প্রচারক
                  </p>
                  <p className="truncate text-sm font-bold text-(--text-main)">
                    {mainPropagator.name}
                    {propagators.length > 1 && (
                      <span className="ml-1.5 text-xs font-normal text-(--text-muted)">
                        +{propagators.length - 1} জন
                      </span>
                    )}
                  </p>
                  <p className="truncate text-[11px] text-(--text-muted)">
                    {mainPropagator.role}
                  </p>
                </div>
              </div>

              {propagators.length > 1 && (
                <div className="hidden -space-x-2 sm:flex shrink-0">
                  {propagators.slice(1, 4).map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl ring-2 ring-(--bg-main)"
                      title={p.name}
                    >
                      <ScholarAvatar
                        image={p.image}
                        name={p.name}
                        englishName={p.englishName}
                        sizeClass="h-9 w-9 text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <Link href={`/alerts/${alert.slug}`}>
            <h3 className="mb-3 text-lg font-extrabold leading-snug text-(--text-main) transition-colors group-hover:text-(--accent-emerald) md:text-xl">
              {alert.title}
            </h3>
          </Link>

          <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-(--text-muted) md:text-sm">
            {alert.summary}
          </p>

          <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-(--border-color) bg-(--bg-main) p-3 text-xs">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 shrink-0 text-red-500" />
              <div>
                <p className="font-bold text-(--text-main)">
                  {alert.claims?.length || 0}টি ভ্রান্ত দাবি
                </p>
                <p className="text-[10px] text-(--text-muted)">চিহ্নিত সংশয়</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-(--border-color) pl-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-(--accent-emerald)" />
              <div>
                <p className="font-bold text-(--text-main)">
                  {alert.clarifications?.length || 0}টি দালিলিক জবাব
                </p>
                <p className="text-[10px] text-(--text-muted)">কুরআন ও সুন্নাহ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-(--border-color) bg-(--bg-subtle)/60 px-6 py-4 text-xs">
        <div className="flex items-center gap-3 text-(--text-muted)">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-(--accent-gold)" />
            {alert.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-(--accent-emerald)" />
            {alert.readTime}
          </span>
        </div>

        <Link
          href={`/alerts/${alert.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-(--border-color) bg-(--bg-card) px-3.5 py-2 font-bold text-(--accent-gold) shadow-xs transition-all group-hover:border-(--accent-emerald) group-hover:bg-(--badge-bg)"
        >
          <span>পর্যালোচনা পড়ুন</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}