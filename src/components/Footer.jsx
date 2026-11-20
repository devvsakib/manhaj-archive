import Link from "next/link";
import { Library } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-(--border-color) bg-[#0B0F0D] pt-12 pb-8 text-(--text-muted)">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid gap-8 md:grid-cols-4 pb-10 border-b border-(--border-color)/80">
                    {/* Brand Info */}
                    <div className="md:col-span-2">
                        <Link href="/" className="mb-3 flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C59B27]/40 bg-[#14452F] text-[#C59B27]">
                                <Library className="h-4 w-4" />
                            </div>
                            <span className="font-inter text-base font-bold tracking-wide text-(--text-main)">
                                MANHAJ <span className="text-[#C59B27]">ARCHIVE</span>
                            </span>
                        </Link>
                        <p className="max-w-md text-xs leading-relaxed text-(--text-muted)">
                            কুরআন, সহীহ সুন্নাহ এবং সালাফে সালেহীনদের বুঝ অনুযায়ী বিশুদ্ধ ইসলামি জ্ঞান প্রচার, নির্ভরযোগ্য কিতাব পরিচিতি এবং চলমান বিভ্রান্তি নিরসনে নিবেদিত একটি ইলমি প্ল্যাটফর্ম।
                        </p>
                    </div>

                    {/* Knowledge Sections */}
                    <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-200">
                            ইলমি বিভাগসমূহ
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/aqeedah" className="hover:text-[#C59B27] transition">
                                    আকিদা ও মানহাজ
                                </Link>
                            </li>
                            <li>
                                <Link href="/library" className="hover:text-[#C59B27] transition">
                                    উসূল ও আদব লাইব্রেরি
                                </Link>
                            </li>
                            <li>
                                <Link href="/books" className="hover:text-[#C59B27] transition">
                                    তালিবুল ইলম কিতাব গাইড
                                </Link>
                            </li>
                            <li>
                                <Link href="/qa" className="hover:text-[#C59B27] transition">
                                    প্রশ্নোত্তর ও ফতোয়া
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Alerts & Scholars */}
                    <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-200">
                            রেফারেন্স ও সতর্কতা
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/alerts" className="hover:text-[#C59B27] transition">
                                    চলমান ফিতনা ওভারভিউ
                                </Link>
                            </li>
                            <li>
                                <Link href="/scholars" className="hover:text-[#C59B27] transition">
                                    প্রাজ্ঞ উলামাদের বক্তব্য
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 text-center text-xs text-slate-500">
                    <p>© 2026 Manhaj Archive (manhajarchive.com). সর্বস্বত্ব সংরক্ষিত।</p>
                </div>
            </div>
        </footer>
    );
}