import Link from "next/link";
import { ArrowLeft, Video, UserCheck, PlayCircle } from "lucide-react";
import { scholarsData } from "@/data/libraryAndScholarsData";

export const metadata = {
    title: "উলামাদের বক্তব্য ও ভিডিও আর্কাইভ",
    description:
        "সমসাময়িক ফিতনা, আদব এবং সালাফি মানহাজ সম্পর্কে প্রাজ্ঞ উলামায়ে কেরামের দিকনির্দেশনামূলক ভিডিও বক্তব্যের আর্কাইভ।",
};

export default function ScholarsArchivePage() {
    return (
        <div className="min-h-screen bg-(--bg-main) text-(--text-main)">

            {/* Hero */}
            <section className="border-b border-(--border-color)/80 bg-[#131C18] py-14">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C59B27]/30 bg-[#14452F]/10 dark:bg-[#14452F]/40 px-4 py-1 text-xs font-medium text-[#C59B27]">
                        <Video className="h-3.5 w-3.5" />
                        <span>প্রাজ্ঞ উলামাদের দিকনির্দেশনা</span>
                    </div>
                    <h1 className="mb-4 text-3xl font-bold text-(--text-main) md:text-4xl">
                        উলামাদের বক্তব্য ও ভিডিও আর্কাইভ
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-(--text-muted) md:text-base">
                        ফিতনার সময়ে অপরিপক্ব বক্তাদের কথায় বিভ্রান্ত না হয়ে প্রাজ্ঞ ও নির্ভরযোগ্য আলেমদের সরাসরি বক্তব্য শুনুন।
                    </p>
                </div>
            </section>

            {/* Video Grid */}
            <main className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {scholarsData.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-card) transition hover:border-[#2E8B57]/60"
                        >
                            <div>
                                {/* Responsive YouTube Embed */}
                                <div className="relative aspect-video w-full bg-black">
                                    <iframe
                                        className="h-full w-full"
                                        src={`https://www.youtube.com/embed/${item.youtubeId}`}
                                        title={item.topic}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>

                                <div className="p-5">
                                    <div className="mb-2 flex items-center justify-between text-xs text-[#C59B27]">
                                        <span className="flex items-center gap-1 font-semibold">
                                            <UserCheck className="h-3.5 w-3.5" />
                                            {item.scholarName}
                                        </span>
                                        <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">
                                            {item.duration}
                                        </span>
                                    </div>

                                    <p className="mb-3 text-[11px] text-slate-500">
                                        {item.designation}
                                    </p>

                                    <h2 className="mb-3 text-lg font-bold leading-snug text-(--text-main)">
                                        {item.topic}
                                    </h2>

                                    <p className="text-xs leading-relaxed text-(--text-muted)">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-(--border-color)/80 bg-[#111714] px-5 py-3 text-xs text-(--text-muted) flex items-center gap-1.5">
                                <PlayCircle className="h-4 w-4 text-[#3CB371]" />
                                <span>সরাসরি প্লে করে দেখুন</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}