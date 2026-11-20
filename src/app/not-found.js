import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C59B27]/40 bg-[#14452F]/10 dark:bg-[#14452F]/40 text-[#C59B27]">
                <Compass className="h-8 w-8" />
            </div>
            <h1 className="mb-2 font-inter text-4xl font-bold text-(--text-main)">
                ৪০৪ - পৃষ্ঠাটি পাওয়া যায়নি
            </h1>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-(--text-muted)">
                আপনি যে লিংকটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে অথবা ঠিকানাটি ভুল লেখা হয়েছে।
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#14452F] px-6 py-3 text-sm font-semibold text-white border border-[#2E8B57]/60 transition hover:bg-[#1b593d]"
            >
                <ArrowLeft className="h-4 w-4" />
                হোমপেজে ফিরে যান
            </Link>
        </div>
    );
}