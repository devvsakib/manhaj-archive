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
} from "lucide-react";
import { alertsData } from "@/data/alertsData";
import { libraryData, scholarsData } from "@/data/libraryAndScholarsData";
import FitnaAlertCard from "@/components/FitnaAlertCard";

const knowledgeCategories = [
  {
    title: "আকিদা ও মানহাজ",
    description: "তাওহীদ, সুন্নাহর অনুসরণ এবং সালাফে সালেহীনদের বিশ্বাসের মৌলিক রূপরেখা।",
    href: "/aqeedah",
    icon: Compass,
    count: "১২টি প্রবন্ধ",
  },
  {
    title: "উসূল ও আদব",
    description: "ইলম অর্জনের সঠিক পদ্ধতি, উলামাদের মর্যাদা এবং মতবিরোধের আদব।",
    href: "/library",
    icon: Scale,
    count: "৮টি প্রবন্ধ",
  },
  {
    title: "কিতাব ও পাঠক্রম",
    description: "প্রাথমিক থেকে উচ্চতর স্তরের তালিবুল ইলমদের জন্য নির্ভরযোগ্য বইয়ের তালিকা।",
    href: "/books",
    icon: BookMarked,
    count: "১৫টি কিতাব",
  },
  {
    title: "প্রশ্নোত্তর ও ফতোয়া",
    description: "সমসাময়িক বিভিন্ন সংশয় ও দ্বীনি প্রশ্নের দলিলভিত্তিক সংক্ষিপ্ত উত্তর।",
    href: "/qa",
    icon: HelpCircle,
    count: "২৫+ প্রশ্নোত্তর",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-(--border-color)/80 bg-gradient-to-b from-[#13201B] to-[#0F1412] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C59B27]/30 bg-[#14452F]/10 dark:bg-[#14452F]/40 px-4 py-1.5 text-xs font-medium text-[#C59B27]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>ইলম, আদব ও বিশুদ্ধ মানহাজের সমন্বিত আর্কাইভ</span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-(--text-main) md:text-5xl">
            কুরআন ও সুন্নাহর আলোকে গড়ে উঠুক{" "}
            <span className="text-[#3CB371]">বিশুদ্ধ জ্ঞান ও প্রজ্ঞা</span>
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-(--text-muted) md:text-lg">
            আকিদা ও উসূলের মৌলিক পাঠ, নির্ভরযোগ্য কিতাব পরিচিতি, প্রাজ্ঞ আলেমদের দিকনির্দেশনা এবং সমসাময়িক ফিতনা সম্পর্কে দলিলভিত্তিক ওভারভিউ।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/library"
              className="rounded-xl bg-[#14452F] px-6 py-3 text-sm font-semibold text-white border border-[#2E8B57]/60 transition hover:bg-[#1b593d]"
            >
              ইলমি লাইব্রেরি দেখুন
            </Link>
            <Link
              href="/alerts"
              className="rounded-xl border border-slate-700 bg-(--bg-card) px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#C59B27]/60 hover:text-[#C59B27]"
            >
              চলমান ফিতনা ওভারভিউ
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Core Knowledge Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
              Knowledge Base
            </span>
            <h2 className="mt-1 text-2xl font-bold text-(--text-main) md:text-3xl">
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
                className="group flex flex-col justify-between rounded-xl border border-(--border-color) bg-(--bg-card) p-6 transition hover:border-[#2E8B57]/60 hover:bg-[#17201C]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#14452F]/10 dark:bg-[#14452F]/60 text-[#3CB371] border border-[#2E8B57]/30">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-(--text-muted)">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-(--text-main) group-hover:text-[#3CB371] transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-(--text-muted)">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#C59B27]">
                  <span>প্রবেশ করুন</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section 2: Active Fitna Overview (Compact & Informative) */}
      <section className="border-y border-(--border-color)/80 bg-[#121715] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Current Landscape Overview</span>
              </div>
              <h2 className="text-2xl font-bold text-(--text-main) md:text-3xl">
                চলমান ফিতনা ওভারভিউ ও সতর্কতা
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-(--text-muted)">
                বর্তমান সময়ে সোশ্যাল মিডিয়া ও তরুণদের মাঝে ছড়িয়ে পড়া প্রধান মানহাজগত বিভ্রান্তিগুলোর সংক্ষিপ্ত চিত্র এবং দলিলভিত্তিক জবাব।
              </p>
            </div>

            <Link
              href="/alerts"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C59B27] hover:underline"
            >
              সবগুলো ওভারভিউ দেখুন
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {alertsData.slice(0, 2).map((alert) => (
              <FitnaAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Featured Articles from Usul & Adab Library */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3CB371]">
              Foundational Articles
            </span>
            <h2 className="mt-1 text-2xl font-bold text-(--text-main) md:text-3xl">
              নির্বাচিত ইলমি প্রবন্ধসমূহ
            </h2>
          </div>
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C59B27] hover:underline"
          >
            সম্পূর্ণ লাইব্রেরি দেখুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {libraryData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-(--border-color) bg-(--bg-card) p-6"
            >
              <div>
                <span className="mb-3 inline-block rounded bg-[#14452F]/10 dark:bg-[#14452F]/50 px-2.5 py-1 text-xs font-medium text-[#3CB371]">
                  {item.category}
                </span>
                <h3 className="mb-3 text-lg font-bold leading-snug text-(--text-main)">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-(--text-muted)">
                  {item.summary}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-(--border-color)/80 flex items-center justify-between text-xs text-slate-500">
                <span>{item.readTime}</span>
                <Link
                  href="/library"
                  className="font-semibold text-[#C59B27] hover:underline"
                >
                  পাঠ করুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Scholars' Guidance Preview */}
      <section className="border-t border-(--border-color)/80 bg-[#121715] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
                Scholars' Guidance
              </span>
              <h2 className="mt-1 text-2xl font-bold text-(--text-main) md:text-3xl">
                প্রাজ্ঞ উলামাদের দিকনির্দেশনা
              </h2>
            </div>
            <Link
              href="/scholars"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C59B27] hover:underline"
            >
              সব ভিডিও আর্কাইভ দেখুন
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {scholarsData.map((sch) => (
              <div
                key={sch.id}
                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#3CB371]">
                  <Video className="h-4 w-4" />
                  <span>{sch.scholarName}</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-(--text-main)">
                  {sch.topic}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-(--text-muted) line-clamp-2">
                  {sch.description}
                </p>
                <Link
                  href="/scholars"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#C59B27] hover:underline"
                >
                  বক্তব্য শুনুন
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}