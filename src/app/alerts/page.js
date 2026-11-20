"use client";

import { useState } from "react";
import { ShieldAlert, Search } from "lucide-react";
import { alertsData } from "@/data/alertsData";
import FitnaAlertCard from "@/components/FitnaAlertCard";

export default function AllAlertsPage() {
    const [search, setSearch] = useState("");

    const filtered = alertsData.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.summary.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-800/50 bg-red-950/60 px-4 py-1 text-xs font-medium text-red-300">
                    <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                    <span>সতর্কবার্তা ও পর্যালোচনা</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
                    চলমান ফিতনা ওভারভিউ আর্কাইভ
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-sm text-(--text-muted) md:text-base">
                    বর্তমান সময়ের বিভিন্ন মানহাজগত বিচ্যুতি, চরমপন্থা এবং উলামায়ে কেরামের বিরুদ্ধে ছড়ানো বিভ্রান্তির সংক্ষিপ্ত চিত্র ও দলিলভিত্তিক জবাব।
                </p>

                <div className="mx-auto max-w-md relative">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-(--text-muted)" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ফিতনা বা বিষয় লিখে খুঁজুন..."
                        className="w-full rounded-xl border border-slate-700 bg-(--bg-card) py-2.5 pl-10 pr-4 text-sm text-(--text-main) placeholder-slate-500 focus:border-[#2E8B57] focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((alert) => (
                    <FitnaAlertCard key={alert.id} alert={alert} />
                ))}
            </div>
        </div>
    );
}