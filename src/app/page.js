import Link from "next/link";
import {
  BookOpen,
  Scale,
  HelpCircle,
  Video,
  AlertTriangle,
  ArrowRight,
  Compass,
  BookMarked,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  BrainCircuit,
  BookA,
  Quote,
} from "lucide-react";
import { alertsData } from "@/data/alertsData";
import { libraryData, scholarsData } from "@/data/libraryAndScholarsData";
import FitnaAlertCard from "@/components/FitnaAlertCard";
import HeroSearchTrigger from "@/components/HeroSearchTrigger";

const knowledgeCategories = [
  {
    title: "আকিদা ও মানহাজ",
    description:
      "তাওহীদ, সুন্নাহর অনুসরণ এবং সালাফে সালেহীনদের বিশ্বাসের মৌলিক রূপরেখা।",
    href: "/aqeedah",
    icon: Compass,
    count: "১২টি প্রবন্ধ",
    accent: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "উসূল ও আদব",
    description:
      "ইলম অর্জনের সঠিক পদ্ধতি, উলামাদের মর্যাদা এবং মতবিরোধের আদব।",
    href: "/usul-adab",
    icon: Scale,
    count: "৮টি প্রবন্ধ",
    accent: "from-amber-500/20 to-yellow-500/5",
  },
  {
    title: "কিতাব ও পাঠক্রম",
    description:
      "প্রাথমিক থেকে উচ্চতর স্তরের তালিবুল ইলমদের জন্য নির্ভরযোগ্য বইয়ের তালিকা।",
    href: "/library",
    icon: BookMarked,
    count: "১৫টি কিতাব",
    accent: "from-emerald-500/20 to-green-500/5",
  },
  {
    title: "প্রশ্নোত্তর ও ফতোয়া",
    description:
      "সমসাময়িক বিভিন্ন সংশয় ও দ্বীনি প্রশ্নের দলিলভিত্তিক সংক্ষিপ্ত উত্তর।",
    href: "/qa",
    icon: HelpCircle,
    count: "২৫+ প্রশ্নোত্তর",
    accent: "from-amber-500/20 to-orange-500/5",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden border-b border-(--border-color) bg-(--bg-main) py-20 md:py-28">
        {/* Subtle Dot Grid Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#2E8B57_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.08] dark:opacity-[0.14]"
        />

        {/* Ambient Radial Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-[#14452F]/20 blur-3xl dark:bg-[#2E8B57]/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-6 h-72 w-72 rounded-full bg-[#C59B27]/12 blur-3xl"
        />

        {/* Rotating Islamic Geometric 8-Point Star Shape (Rub el Hizb) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[540px] w-[540px] text-[#C59B27]/[0.07] dark:text-[#C59B27]/[0.06] animate-slow-spin md:h-[680px] md:w-[680px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        >
          <rect x="35" y="35" width="130" height="130" rx="4" />
          <rect
            x="35"
            y="35"
            width="130"
            height="130"
            rx="4"
            transform="rotate(45 100 100)"
          />
          <circle cx="100" cy="100" r="88" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="56" />
        </svg>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          {/* Floating Top Pill Badge */}
          <div className="animate-float-gentle mb-6 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1.5 text-xs font-semibold text-(--accent-gold) shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ইলম, আদব ও বিশুদ্ধ মানহাজের সমন্বিত আর্কাইভ</span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight leading-[1.24] text-(--text-main) sm:text-4xl md:text-5xl lg:text-[56px]">
            কুরআন ও সুন্নাহর আলোকে গড়ে উঠুক{" "}
            <span className="bg-linear-to-r from-[#156B45] via-[#2E8B57] to-[#9A7312] bg-clip-text text-transparent dark:from-[#3CB371] dark:via-[#4ADE80] dark:to-[#C59B27]">
              বিশুদ্ধ জ্ঞান ও প্রজ্ঞা
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-9 max-w-2xl text-sm leading-relaxed text-(--text-muted) sm:text-base md:text-lg">
            আকিদা ও উসূলের মৌলিক পাঠ, নির্ভরযোগ্য কিতাব পরিচিতি, প্রাজ্ঞ আলেমদের দিকনির্দেশনা এবং সমসাময়িক ফিতনা সম্পর্কে দলিলভিত্তিক ওভারভিউ।
          </p>

          {/* Interactive Global Search Bar */}
          <HeroSearchTrigger />

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/library"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#2E8B57]/70 bg-[#14452F] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14452F]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b593d] hover:shadow-xl"
            >
              <BookOpen className="h-4 w-4 text-[#C59B27]" />
              <span>ইলমি লাইব্রেরি দেখুন</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/alerts"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-(--border-color) bg-(--bg-card)/90 px-7 py-3.5 text-sm font-semibold text-(--text-main) shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-(--accent-gold) hover:text-(--accent-gold)"
            >
              <ShieldAlert className="h-4 w-4 text-red-500 transition-transform duration-300 group-hover:scale-110" />
              <span>চলমান ফিতনা ওভারভিউ</span>
            </Link>
          </div>

          {/* Trust & Methodology Pillars Bar */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-(--border-color)/70 pt-6 text-xs font-medium text-(--text-muted)">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-(--accent-emerald)" />
              সালাফে সালেহীনদের বুঝ অনুযায়ী
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-(--accent-emerald)" />
              কুরআন ও সহীহ হাদিসের দলিলভিত্তিক
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-(--accent-emerald)" />
              প্রাজ্ঞ আলেমদের ফতোয়া ও তাহকীক
            </span>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 1: KNOWLEDGE CATEGORIES ==================== */}
      <section className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-md bg-(--badge-bg) px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-(--accent-gold)">
              Knowledge Base
            </span>
            <h2 className="mt-2 text-2xl font-bold text-(--text-main) md:text-3xl">
              বিষয়ভিত্তিক ইলমি বিভাগসমূহ
            </h2>
          </div>
          <p className="text-sm text-(--text-muted)">
            ধারাবাহিকভাবে দ্বীনের মৌলিক জ্ঞান অর্জনের জন্য বিভাগ নির্বাচন করুন
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {knowledgeCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-(--accent-emerald)/70 hover:shadow-xl hover:shadow-[#14452F]/10"
              >
                {/* Top Corner Decorative Gradient Shape */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-linear-to-br ${cat.accent} blur-xl transition-transform duration-500 group-hover:scale-150`}
                />

                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2E8B57]/30 bg-(--badge-bg) text-(--accent-emerald) transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-(--border-color) bg-(--bg-main) px-2.5 py-0.5 text-[11px] font-semibold text-(--text-muted)">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-(--text-main) transition-colors group-hover:text-(--accent-emerald)">
                    {cat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-(--text-muted)">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-(--accent-gold)">
                  <span>প্রবেশ করুন</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ==================== SECTION 2: ACTIVE FITNA OVERVIEW ==================== */}
      <section className="relative overflow-hidden border-y border-(--border-color) bg-(--bg-subtle) py-20">
        {/* Decorative Right Blur Shape */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-24 h-80 w-80 -translate-y-1/2 rounded-full bg-red-500/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500 dark:text-red-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Current Landscape Overview</span>
              </div>
              <h2 className="mt-1 text-2xl font-bold text-(--text-main) md:text-3xl">
                চলমান ফিতনা ওভারভিউ ও সতর্কতা
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-(--text-muted)">
                বর্তমান সময়ে সোশ্যাল মিডিয়া ও তরুণদের মাঝে ছড়িয়ে পড়া প্রধান মানহাজগত বিভ্রান্তিগুলোর সংক্ষিপ্ত চিত্র এবং দলিলভিত্তিক জবাব।
              </p>
            </div>

            <Link
              href="/alerts"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-(--border-color) bg-(--bg-card) px-4 py-2.5 text-xs font-semibold text-(--accent-gold) transition hover:border-(--accent-gold)"
            >
              <span>সবগুলো ওভারভিউ দেখুন</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {alertsData.slice(0, 2).map((alert) => (
              <FitnaAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: FEATURED ARTICLES ==================== */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-md bg-(--badge-bg) px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-(--accent-emerald)">
              Foundational Articles
            </span>
            <h2 className="mt-2 text-2xl font-bold text-(--text-main) md:text-3xl">
              নির্বাচিত ইলমি প্রবন্ধসমূহ
            </h2>
          </div>
          <Link
            href="/library"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent-gold) hover:underline"
          >
            <span>সম্পূর্ণ লাইব্রেরি দেখুন</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {libraryData.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-(--accent-emerald)/60 hover:shadow-lg"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-block rounded-md bg-(--badge-bg) px-2.5 py-1 text-xs font-semibold text-(--badge-text)">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-(--text-muted)">
                    {item.readTime}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold leading-snug text-(--text-main) transition-colors group-hover:text-(--accent-gold)">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-(--text-muted)">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-(--border-color) pt-4 text-xs">
                <span className="font-medium text-(--text-muted)">
                  দালিলিক তাহকীক
                </span>
                <Link
                  href="/library"
                  className="inline-flex items-center gap-1 font-semibold text-(--accent-emerald) group-hover:underline"
                >
                  <span>পাঠ করুন</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SECTION 4: SCHOLARS' GUIDANCE ==================== */}
      <section className="border-t border-(--border-color) bg-(--bg-subtle) py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-block rounded-md bg-(--badge-bg) px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-(--accent-gold)">
                Scholars&apos; Guidance
              </span>
              <h2 className="mt-2 text-2xl font-bold text-(--text-main) md:text-3xl">
                প্রাজ্ঞ উলামাদের দিকনির্দেশনা
              </h2>
            </div>
            <Link
              href="/statements"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent-gold) hover:underline"
            >
              <span>সকল বক্তব্য ও ফতোয়া দেখুন</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {scholarsData.map((sch) => (
              <div
                key={sch.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-(--accent-gold)/60 hover:shadow-lg"
              >
                <Quote
                  aria-hidden="true"
                  className="absolute top-5 right-5 h-8 w-8 text-(--accent-gold)/10 transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-(--accent-emerald)">
                    <Video className="h-4 w-4 shrink-0" />
                    <span>{sch.scholarName}</span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-(--text-main)">
                    {sch.topic}
                  </h3>
                  <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-(--text-muted)">
                    {sch.description}
                  </p>
                </div>

                <Link
                  href="/statements"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-gold) group-hover:underline"
                >
                  <span>বক্তব্য শুনুন ও পড়ুন</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: INTERACTIVE TOOLS CALLOUT ==================== */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-[#2E8B57]/40 bg-linear-to-br from-[#14452F] via-[#103826] to-[#0C261B] p-8 text-white shadow-xl md:p-12">
          {/* Geometric Corner Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full border border-[#C59B27]/20 bg-[#C59B27]/10 blur-2xl"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#C59B27]/40 bg-black/20 px-3.5 py-1 text-xs font-semibold text-[#C59B27]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ইন্টার‍্যাক্টিভ ইলম চর্চা</span>
              </span>
              <h2 className="mb-3 text-2xl font-bold leading-snug md:text-3xl">
                আপনার আকিদা ও মানহাজের জ্ঞান যাচাই করুন এবং পরিভাষা শিখুন
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
                সহীহ দলিলভিত্তিক কুইজের মাধ্যমে নিজের অবস্থান যাচাই করুন অথবা আরবি-শরয়ি পরিভাষা অভিধান থেকে গুরুত্বপূর্ণ শব্দগুলোর ব্যাখ্যা জানুন।
              </p>
            </div>

            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C59B27] px-6 py-3.5 text-xs font-bold text-[#0F1412] shadow-md transition hover:-translate-y-0.5 hover:bg-[#d8ad33] md:text-sm"
              >
                <BrainCircuit className="h-4 w-4" />
                <span>মানহাজ কুইজ দিন</span>
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-semibold text-white backdrop-blur-xs transition hover:-translate-y-0.5 hover:bg-white/20 md:text-sm"
              >
                <BookA className="h-4 w-4 text-[#C59B27]" />
                <span>পরিভাষা অভিধান</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}