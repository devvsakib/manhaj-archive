"use client";

import { useState } from "react";
import { Download, Copy, Check, Share2 } from "lucide-react";

export default function FactCardGenerator({ alert }) {
    const [copied, setCopied] = useState(false);

    const handleCopyText = () => {
        const shareText = `⚠️ ${alert.status}: ${alert.title}\n\n📌 সারসংক্ষেপ: ${alert.summary}\n\n📚 বিস্তারিত দলিলসহ পড়ুন: https://manhajarchive.com/alerts/${alert.slug}`;
        navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleDownloadCard = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1080;
        canvas.height = 1080;
        const ctx = canvas.getContext("2d");

        // Background
        ctx.fillStyle = "#0F1412";
        ctx.fillRect(0, 0, 1080, 1080);

        // Outer Border
        ctx.strokeStyle = "#C59B27";
        ctx.lineWidth = 6;
        ctx.strokeRect(40, 40, 1000, 1000);

        // Top Header Badge
        ctx.fillStyle = "#14452F";
        ctx.fillRect(80, 85, 260, 48);
        ctx.fillStyle = "#C59B27";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("MANHAJ ARCHIVE", 105, 117);

        // Status Tag
        ctx.fillStyle = "#7F1D1D";
        ctx.fillRect(760, 85, 240, 48);
        ctx.fillStyle = "#FCA5A5";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText(alert.status, 800, 117);

        // Title Wrapping
        ctx.fillStyle = "#F8FAFC";
        ctx.font = "bold 42px sans-serif";
        wrapText(ctx, alert.title, 80, 220, 920, 58);

        // Divider Line
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(80, 450);
        ctx.lineTo(1000, 450);
        ctx.stroke();

        // Key Evidence / Quote
        ctx.fillStyle = "#3CB371";
        ctx.font = "bold 26px sans-serif";
        ctx.fillText("মূল দলিল ও পর্যালোচনা:", 80, 510);

        ctx.fillStyle = "#CBD5E1";
        ctx.font = "28px sans-serif";
        const highlightText =
            alert.clarifications?.[0]?.evidence || alert.summary;
        wrapText(ctx, highlightText, 80, 565, 920, 44);

        // Footer
        ctx.fillStyle = "#141B18";
        ctx.fillRect(43, 940, 994, 97);
        ctx.fillStyle = "#C59B27";
        ctx.font = "bold 24px sans-serif";
        ctx.fillText("বিস্তারিত পড়ুন: manhajarchive.com", 80, 997);

        // Trigger Download
        const link = document.createElement("a");
        link.download = `${alert.slug}-card.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    // Helper function for text wrapping on Canvas
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(" ");
        let line = "";
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = context.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                context.fillText(line, x, currentY);
                line = words[n] + " ";
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, currentY);
    }

    return (
        <div className="my-10 rounded-xl border border-[#C59B27]/30 bg-(--bg-card) p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h4 className="flex items-center gap-2 text-base font-bold text-(--text-main)">
                        <Share2 className="h-4 w-4 text-[#C59B27]" />
                        সচেতনতা ছড়িয়ে দিন
                    </h4>
                    <p className="mt-1 text-xs text-(--text-muted)">
                        বিভ্রান্তি নিরসনে এই অ্যালার্টটির সারসংক্ষেপ কপি করুন অথবা ফ্যাক্ট-কার্ড ডাউনলোড করে শেয়ার করুন।
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleCopyText}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-(--bg-main) px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-[#2E8B57] hover:text-white"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 text-[#3CB371]" />
                                কপি হয়েছে
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                সারসংক্ষেপ কপি
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleDownloadCard}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#14452F] px-4 py-2.5 text-xs font-semibold text-white border border-[#2E8B57]/60 transition hover:bg-[#1b593d]"
                    >
                        <Download className="h-4 w-4 text-[#C59B27]" />
                        ফ্যাক্ট-কার্ড ডাউনলোড
                    </button>
                </div>
            </div>
        </div>
    );
}