"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getSession } from "@/lib/adminStore";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (getSession()) {
            router.replace("/admin");
        }
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const user = loginUser(email, password);
        if (!user) {
            setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়, কিংবা অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে।");
            return;
        }
        router.push("/admin");
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-(--border-color) bg-(--bg-card) p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-3.5 py-1 text-xs font-medium text-(--accent-gold)">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>EDITORIAL PORTAL</span>
                    </div>
                    <h1 className="text-2xl font-bold text-(--text-main)">
                        অ্যাডমিন ও মডারেটর লগইন
                    </h1>
                    <p className="mt-1 text-xs text-(--text-muted)">
                        কন্টেন্ট পরিচালনা ও পর্যালোচনার জন্য লগইন করুন
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-800/60 bg-red-950/40 p-3 text-xs text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                            ইমেইল অ্যাড্রেস
                        </label>
                        <div className="relative">
                            <Mail className="absolute top-3 left-3.5 h-4 w-4 text-(--text-muted)" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@manhajarchive.com"
                                className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) py-2.5 pr-3.5 pl-10 text-sm text-(--text-main) focus:border-(--accent-emerald) focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-(--text-muted)">
                            পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <Lock className="absolute top-3 left-3.5 h-4 w-4 text-(--text-muted)" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) py-2.5 pr-3.5 pl-10 text-sm text-(--text-main) focus:border-(--accent-emerald) focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2E8B57]/60 bg-[#14452F] py-3 text-xs font-semibold text-white transition hover:bg-[#1b593d]"
                    >
                        <span>লগইন করুন</span>
                        <ArrowRight className="h-4 w-4 text-[#C59B27]" />
                    </button>
                </form>

                {/* Quick Demo Credentials Info */}
                <div className="mt-6 rounded-xl border border-(--border-color) bg-(--bg-main) p-3.5 text-[11px] text-(--text-muted)">
                    <p className="mb-1 font-semibold text-(--accent-gold)">ডিফল্ট লগইন তথ্য:</p>
                    <p>Admin: <code className="text-(--text-main)">admin@manhajarchive.com</code> / <code className="text-(--text-main)">admin123</code></p>
                    <p>Moderator: <code className="text-(--text-main)">mod@manhajarchive.com</code> / <code className="text-(--text-main)">mod123</code></p>
                </div>
            </div>
        </div>
    );
}