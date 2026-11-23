"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    getSession,
    logoutUser,
    loadCollection,
    saveCollection,
    getUsers,
    saveUsers,
} from "@/lib/adminStore";
import {
    LogOut,
    Plus,
    Edit3,
    Trash2,
    CheckCircle2,
    Users,
    ShieldAlert,
    BookOpen,
    HelpCircle,
    Library,
    BookA,
    Download,
} from "lucide-react";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [activeTab, setActiveTab] = useState("alerts");
    const [toast, setToast] = useState("");

    // Collections State
    const [alerts, setAlerts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [qaItems, setQaItems] = useState([]);
    const [books, setBooks] = useState([]);
    const [glossary, setGlossary] = useState([]);
    const [users, setUsers] = useState([]);

    // Edit ID tracker
    const [editingId, setEditingId] = useState(null);

    // Generic Form State
    const [form, setForm] = useState({});

    useEffect(() => {
        const current = getSession();
        if (!current) {
            router.replace("/admin/login");
            return;
        }
        setSession(current);
        setAlerts(loadCollection("alerts"));
        setArticles(loadCollection("articles"));
        setQaItems(loadCollection("qa"));
        setBooks(loadCollection("books"));
        setGlossary(loadCollection("glossary"));
        setUsers(getUsers());
    }, [router]);

    const notify = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 3500);
    };

    const handleLogout = () => {
        logoutUser();
        router.push("/admin/login");
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({});
    };

    if (!session) return null;

    const isAdmin = session.role === "admin";

    // Save Handlers
    const handleSaveAlert = (e) => {
        e.preventDefault();
        const newItem = {
            id: editingId || Date.now(),
            slug: form.slug || `alert-${Date.now()}`,
            status: form.status || "চলমান ফিতনা",
            severity: form.severity || "high",
            category: form.category || "আকিদা ও মানহাজ",
            date: form.date || "২৩ নভেম্বর, ২০২৬",
            readTime: form.readTime || "৫ মিনিট",
            title: form.title,
            summary: form.summary,
            claims: (form.claimsText || "").split("\n").filter(Boolean),
            clarifications: form.point1
                ? [{ point: form.point1, evidence: form.evidence1 || "" }]
                : [],
            scholarsQuotes: form.scholar
                ? [{ scholar: form.scholar, quote: form.quote || "", source: form.source || "" }]
                : [],
            publishStatus: form.publishStatus || "published",
            authorName: session.name,
        };

        const updated = editingId
            ? alerts.map((a) => (a.id === editingId ? newItem : a))
            : [newItem, ...alerts];
        setAlerts(updated);
        saveCollection("alerts", updated);
        resetForm();
        notify(editingId ? "ফিতনা অ্যালার্ট আপডেট হয়েছে!" : "নতুন ফিতনা অ্যালার্ট যুক্ত হয়েছে!");
    };

    const handleSaveArticle = (e) => {
        e.preventDefault();
        const newItem = {
            id: editingId || Date.now(),
            section: form.section || "aqeedah",
            category: form.category || "তাওহীদ ও আকিদা",
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            references: form.references || "",
            readTime: form.readTime || "৬ মিনিট",
            publishStatus: form.publishStatus || "published",
            authorName: session.name,
        };

        const updated = editingId
            ? articles.map((a) => (a.id === editingId ? newItem : a))
            : [newItem, ...articles];
        setArticles(updated);
        saveCollection("articles", updated);
        resetForm();
        notify(editingId ? "প্রবন্ধ আপডেট হয়েছে!" : "নতুন প্রবন্ধ প্রকাশিত হয়েছে!");
    };

    const handleSaveQa = (e) => {
        e.preventDefault();
        const newItem = {
            id: editingId || Date.now(),
            category: form.category || "আকিদা ও মানহাজ",
            question: form.question,
            answer: form.answer,
            reference: form.reference || "",
            publishStatus: form.publishStatus || "published",
            authorName: session.name,
        };

        const updated = editingId
            ? qaItems.map((q) => (q.id === editingId ? newItem : q))
            : [newItem, ...qaItems];
        setQaItems(updated);
        saveCollection("qa", updated);
        resetForm();
        notify(editingId ? "প্রশ্নোত্তর আপডেট হয়েছে!" : "নতুন প্রশ্নোত্তর যুক্ত হয়েছে!");
    };

    const handleSaveBook = (e) => {
        e.preventDefault();
        const newItem = {
            id: editingId || Date.now(),
            title: form.title,
            author: form.author,
            translator: form.translator || "",
            category: form.category || "আকিদা",
            level: form.level || "প্রাথমিক স্তর",
            summary: form.summary,
            pdfUrl: form.pdfUrl,
            publishStatus: form.publishStatus || "published",
        };

        const updated = editingId
            ? books.map((b) => (b.id === editingId ? newItem : b))
            : [newItem, ...books];
        setBooks(updated);
        saveCollection("books", updated);
        resetForm();
        notify("কিতাব সংরক্ষণ করা হয়েছে!");
    };

    const handleSaveGlossary = (e) => {
        e.preventDefault();
        const newItem = {
            id: editingId || Date.now(),
            term: form.term,
            category: form.category || "আকিদা ও মানহাজ",
            shortMeaning: form.shortMeaning,
            detailedExplanation: form.detailedExplanation,
            publishStatus: form.publishStatus || "published",
        };

        const updated = editingId
            ? glossary.map((g) => (g.id === editingId ? newItem : g))
            : [newItem, ...glossary];
        setGlossary(updated);
        saveCollection("glossary", updated);
        resetForm();
        notify("পরিভাষা সংরক্ষণ করা হয়েছে!");
    };

    // Delete Handler (Admin Only)
    const handleDelete = (type, id) => {
        if (!isAdmin) return;
        if (!window.confirm("আপনি কি নিশ্চিতভাবে এটি স্থায়ীভাবে মুছে ফেলতে চান?")) return;

        const map = {
            alerts: [alerts, setAlerts],
            articles: [articles, setArticles],
            qa: [qaItems, setQaItems],
            books: [books, setBooks],
            glossary: [glossary, setGlossary],
        };
        const [list, setter] = map[type];
        const updated = list.filter((item) => item.id !== id);
        setter(updated);
        saveCollection(type, updated);
        notify("আইটেমটি মুছে ফেলা হয়েছে।");
    };

    // User Management (Admin Only)
    const handleCreateUser = (e) => {
        e.preventDefault();
        if (!isAdmin) return;
        const newUser = {
            id: Date.now(),
            name: form.userName,
            email: form.userEmail,
            password: form.userPassword,
            role: form.userRole || "moderator",
            active: true,
        };
        const updated = [...users, newUser];
        setUsers(updated);
        saveUsers(updated);
        resetForm();
        notify(`নতুন ${newUser.role === "admin" ? "Admin" : "Moderator"} যুক্ত হয়েছে!`);
    };

    const toggleUserStatus = (id) => {
        if (!isAdmin || id === session.id) return;
        const updated = users.map((u) =>
            u.id === id ? { ...u, active: !u.active } : u
        );
        setUsers(updated);
        saveUsers(updated);
        notify("ইউজার স্ট্যাটাস পরিবর্তন হয়েছে।");
    };

    // Export JSON Backup
    const exportBackupJson = () => {
        const payload = { alerts, articles, qaItems, books, glossary };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `manhaj-archive-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
    };

    const tabs = [
        { id: "alerts", label: "ফিতনা অ্যালার্ট", icon: ShieldAlert, count: alerts.length },
        { id: "articles", label: "প্রবন্ধ (Articles)", icon: BookOpen, count: articles.length },
        { id: "qa", label: "প্রশ্নোত্তর (Q&A)", icon: HelpCircle, count: qaItems.length },
        { id: "books", label: "কিতাব লাইব্রেরি", icon: Library, count: books.length },
        { id: "glossary", label: "পরিভাষা কোষ", icon: BookA, count: glossary.length },
    ];

    if (isAdmin) {
        tabs.push({ id: "users", label: "টিম ও Moderator", icon: Users, count: users.length });
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            {/* Top Bar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6">
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <h1 className="text-xl font-bold text-(--text-main) md:text-2xl">
                            এডিটোরিয়াল কন্ট্রোল প্যানেল
                        </h1>
                        <span className="rounded-md bg-(--badge-bg) px-2.5 py-0.5 text-[11px] font-bold uppercase text-(--badge-text)">
                            {session.role}
                        </span>
                    </div>
                    <p className="text-xs text-(--text-muted)">
                        লগইন করেছেন: <strong className="text-(--text-main)">{session.name}</strong> ({session.email})
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={exportBackupJson}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-(--border-color) bg-(--bg-main) px-3.5 py-2 text-xs font-semibold text-(--text-main) transition hover:border-(--accent-emerald)"
                    >
                        <Download className="h-3.5 w-3.5 text-(--accent-gold)" />
                        <span>JSON ব্যাকআপ</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-800/60 bg-red-950/40 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-900/50"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>লগআউট</span>
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-[#2E8B57] bg-[#14452F]/40 px-4 py-3 text-xs font-semibold text-(--text-main)">
                    <CheckCircle2 className="h-4 w-4 text-[#3CB371]" />
                    <span>{toast}</span>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="mb-8 flex flex-wrap gap-2">
                {tabs.map((t) => {
                    const Icon = t.icon;
                    const active = activeTab === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => {
                                setActiveTab(t.id);
                                resetForm();
                            }}
                            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${active
                                    ? "border-[#3CB371] bg-[#14452F] text-white"
                                    : "border-(--border-color) bg-(--bg-card) text-(--text-muted) hover:text-(--text-main)"
                                }`}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{t.label}</span>
                            <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px]">
                                {t.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* TAB 1: FITNA ALERTS */}
            {activeTab === "alerts" && (
                <div className="grid gap-8 lg:grid-cols-12">
                    <form
                        onSubmit={handleSaveAlert}
                        className="space-y-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 lg:col-span-7"
                    >
                        <h2 className="text-lg font-bold text-(--accent-gold)">
                            {editingId ? "ফিতনা অ্যালার্ট এডিট / রিভিউ করুন" : "নতুন ফিতনা অ্যালার্ট লিখুন"}
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                type="text"
                                required
                                placeholder="URL Slug (যেমন: neo-haddadi-fitna)"
                                value={form.slug || ""}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                            />
                            <input
                                type="text"
                                required
                                placeholder="ক্যাটাগরি (যেমন: মানহাজ ও আকিদা)"
                                value={form.category || ""}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <select
                                value={form.severity || "high"}
                                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                            >
                                <option value="high">গুরুত্ব: High (জরুরি)</option>
                                <option value="medium">গুরুত্ব: Medium (মধ্যম)</option>
                            </select>

                            <select
                                value={form.publishStatus || "published"}
                                onChange={(e) => setForm({ ...form, publishStatus: e.target.value })}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                            >
                                <option value="published">Published (লাইভ)</option>
                                <option value="pending_review">Pending Review (রিভিউ বাকি)</option>
                                <option value="draft">Draft (খসড়া)</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            required
                            placeholder="শিরোনাম (Title)"
                            value={form.title || ""}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />

                        <textarea
                            rows={3}
                            required
                            placeholder="সংক্ষিপ্ত সারমর্ম (Summary)"
                            value={form.summary || ""}
                            onChange={(e) => setForm({ ...form, summary: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />

                        <textarea
                            rows={3}
                            placeholder="ভ্রান্ত দাবিগুলো (প্রতি লাইনে ১টি করে)"
                            value={form.claimsText || ""}
                            onChange={(e) => setForm({ ...form, claimsText: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />

                        <input
                            type="text"
                            placeholder="দালিলিক জবাবের মূল পয়েন্ট"
                            value={form.point1 || ""}
                            onChange={(e) => setForm({ ...form, point1: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />

                        <textarea
                            rows={2}
                            placeholder="কুরআন, হাদিস ও আলেমদের দলিল"
                            value={form.evidence1 || ""}
                            onChange={(e) => setForm({ ...form, evidence1: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-[#2E8B57] bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white"
                            >
                                <Plus className="h-4 w-4" />
                                <span>{editingId ? "আপডেট করুন" : "সংরক্ষণ করুন"}</span>
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-xl border border-(--border-color) px-4 py-2.5 text-xs text-(--text-muted)"
                                >
                                    বাতিল
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Existing Alerts List */}
                    <div className="space-y-3 lg:col-span-5">
                        {alerts.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                            >
                                <div className="mb-1.5 flex items-center justify-between text-[11px]">
                                    <span className="rounded bg-(--badge-bg) px-2 py-0.5 font-semibold text-(--badge-text)">
                                        {item.publishStatus || "published"}
                                    </span>
                                    <span className="text-(--text-muted)">{item.date}</span>
                                </div>
                                <h3 className="mb-2 text-sm font-bold text-(--text-main)">{item.title}</h3>
                                <div className="flex items-center gap-3 text-xs">
                                    <button
                                        onClick={() => {
                                            setEditingId(item.id);
                                            setForm({
                                                ...item,
                                                claimsText: (item.claims || []).join("\n"),
                                                point1: item.clarifications?.[0]?.point || "",
                                                evidence1: item.clarifications?.[0]?.evidence || "",
                                            });
                                        }}
                                        className="inline-flex items-center gap-1 text-(--accent-emerald) hover:underline"
                                    >
                                        <Edit3 className="h-3.5 w-3.5" /> রিভিউ / এডিট
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete("alerts", item.id)}
                                            className="inline-flex items-center gap-1 text-red-400 hover:underline"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" /> ডিলিট
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 2: ARTICLES */}
            {activeTab === "articles" && (
                <div className="grid gap-8 lg:grid-cols-12">
                    <form
                        onSubmit={handleSaveArticle}
                        className="space-y-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 lg:col-span-7"
                    >
                        <h2 className="text-lg font-bold text-(--accent-gold)">
                            {editingId ? "প্রবন্ধ রিভিউ ও এডিট" : "নতুন প্রবন্ধ লিখুন"}
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <select
                                value={form.section || "aqeedah"}
                                onChange={(e) => setForm({ ...form, section: e.target.value })}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                            >
                                <option value="aqeedah">আকিদা ও মানহাজ (/aqeedah)</option>
                                <option value="usul-adab">উসূল ও আদব (/usul-adab)</option>
                            </select>
                            <select
                                value={form.publishStatus || "published"}
                                onChange={(e) => setForm({ ...form, publishStatus: e.target.value })}
                                className="rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                            >
                                <option value="published">Published (লাইভ)</option>
                                <option value="pending_review">Pending Review (রিভিউ বাকি)</option>
                                <option value="draft">Draft (খসড়া)</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="প্রবন্ধের শিরোনাম"
                            value={form.title || ""}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <textarea
                            rows={2}
                            required
                            placeholder="সংক্ষিপ্ত সারমর্ম (Excerpt)"
                            value={form.excerpt || ""}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <textarea
                            rows={7}
                            required
                            placeholder="মূল প্রবন্ধ বিস্তারিত লিখুন..."
                            value={form.content || ""}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="text"
                            placeholder="তথ্যসূত্র ও কিতাবের রেফারেন্স"
                            value={form.references || ""}
                            onChange={(e) => setForm({ ...form, references: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <button
                            type="submit"
                            className="rounded-xl border border-[#2E8B57] bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white"
                        >
                            {editingId ? "আপডেট করুন" : "প্রবন্ধ সেভ করুন"}
                        </button>
                    </form>

                    <div className="space-y-3 lg:col-span-5">
                        {articles.length === 0 && (
                            <p className="rounded-xl border border-(--border-color) bg-(--bg-card) p-4 text-xs text-(--text-muted)">
                                এখনো কোনো কাস্টম প্রবন্ধ যুক্ত করা হয়নি।
                            </p>
                        )}
                        {articles.map((art) => (
                            <div
                                key={art.id}
                                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                            >
                                <span className="rounded bg-(--badge-bg) px-2 py-0.5 text-[10px] font-semibold text-(--badge-text)">
                                    {art.section} • {art.publishStatus}
                                </span>
                                <h3 className="my-1.5 text-sm font-bold text-(--text-main)">{art.title}</h3>
                                <div className="flex gap-3 text-xs">
                                    <button
                                        onClick={() => {
                                            setEditingId(art.id);
                                            setForm(art);
                                        }}
                                        className="text-(--accent-emerald) hover:underline"
                                    >
                                        রিভিউ / এডিট
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete("articles", art.id)}
                                            className="text-red-400 hover:underline"
                                        >
                                            ডিলিট
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 3: Q&A */}
            {activeTab === "qa" && (
                <div className="grid gap-8 lg:grid-cols-12">
                    <form
                        onSubmit={handleSaveQa}
                        className="space-y-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 lg:col-span-6"
                    >
                        <h2 className="text-lg font-bold text-(--accent-gold)">
                            {editingId ? "প্রশ্নোত্তর এডিট করুন" : "নতুন প্রশ্নোত্তর যুক্ত করুন"}
                        </h2>
                        <input
                            type="text"
                            required
                            placeholder="ক্যাটাগরি (যেমন: আকিদা ও মানহাজ)"
                            value={form.category || ""}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <textarea
                            rows={2}
                            required
                            placeholder="প্রশ্ন"
                            value={form.question || ""}
                            onChange={(e) => setForm({ ...form, question: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <textarea
                            rows={4}
                            required
                            placeholder="দালিলিক উত্তর"
                            value={form.answer || ""}
                            onChange={(e) => setForm({ ...form, answer: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="text"
                            required
                            placeholder="দলিল ও ফতোয়ার রেফারেন্স"
                            value={form.reference || ""}
                            onChange={(e) => setForm({ ...form, reference: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <button
                            type="submit"
                            className="rounded-xl border border-[#2E8B57] bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white"
                        >
                            সংরক্ষণ করুন
                        </button>
                    </form>

                    <div className="space-y-3 lg:col-span-6">
                        {qaItems.map((q) => (
                            <div
                                key={q.id}
                                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                            >
                                <span className="text-[11px] font-semibold text-(--accent-gold)">
                                    {q.category}
                                </span>
                                <h3 className="my-1 text-sm font-bold text-(--text-main)">{q.question}</h3>
                                <div className="mt-2 flex gap-3 text-xs">
                                    <button
                                        onClick={() => {
                                            setEditingId(q.id);
                                            setForm(q);
                                        }}
                                        className="text-(--accent-emerald) hover:underline"
                                    >
                                        রিভিউ / এডিট
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete("qa", q.id)}
                                            className="text-red-400 hover:underline"
                                        >
                                            ডিলিট
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 4: BOOKS */}
            {activeTab === "books" && (
                <div className="grid gap-8 lg:grid-cols-12">
                    <form
                        onSubmit={handleSaveBook}
                        className="space-y-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 lg:col-span-6"
                    >
                        <h2 className="text-lg font-bold text-(--accent-gold)">কিতাব যুক্ত করুন</h2>
                        <input
                            type="text"
                            required
                            placeholder="কিতাবের নাম"
                            value={form.title || ""}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="text"
                            required
                            placeholder="মূল লেখক"
                            value={form.author || ""}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="url"
                            required
                            placeholder="PDF লিংক (https://...)"
                            value={form.pdfUrl || ""}
                            onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <textarea
                            rows={3}
                            required
                            placeholder="কিতাবের সংক্ষিপ্ত পরিচিতি"
                            value={form.summary || ""}
                            onChange={(e) => setForm({ ...form, summary: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <button
                            type="submit"
                            className="rounded-xl border border-[#2E8B57] bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white"
                        >
                            সংরক্ষণ করুন
                        </button>
                    </form>

                    <div className="space-y-3 lg:col-span-6">
                        {books.map((b) => (
                            <div
                                key={b.id}
                                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                            >
                                <h3 className="text-sm font-bold text-(--text-main)">{b.title}</h3>
                                <p className="text-xs text-(--text-muted)">{b.author}</p>
                                <div className="mt-2 flex gap-3 text-xs">
                                    <button
                                        onClick={() => {
                                            setEditingId(b.id);
                                            setForm(b);
                                        }}
                                        className="text-(--accent-emerald) hover:underline"
                                    >
                                        এডিট
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete("books", b.id)}
                                            className="text-red-400 hover:underline"
                                        >
                                            ডিলিট
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 5: GLOSSARY */}
            {activeTab === "glossary" && (
                <div className="grid gap-8 lg:grid-cols-12">
                    <form
                        onSubmit={handleSaveGlossary}
                        className="space-y-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 lg:col-span-6"
                    >
                        <h2 className="text-lg font-bold text-(--accent-gold)">পরিভাষা যুক্ত করুন</h2>
                        <input
                            type="text"
                            required
                            placeholder="পরিভাষা (যেমন: ইজতিহাদ (الاجتهاد))"
                            value={form.term || ""}
                            onChange={(e) => setForm({ ...form, term: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="text"
                            required
                            placeholder="ক্যাটাগরি"
                            value={form.category || ""}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="text"
                            required
                            placeholder="সংক্ষিপ্ত অর্থ"
                            value={form.shortMeaning || ""}
                            onChange={(e) => setForm({ ...form, shortMeaning: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <textarea
                            rows={3}
                            required
                            placeholder="বিস্তারিত ব্যাখ্যা"
                            value={form.detailedExplanation || ""}
                            onChange={(e) =>
                                setForm({ ...form, detailedExplanation: e.target.value })
                            }
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <button
                            type="submit"
                            className="rounded-xl border border-[#2E8B57] bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white"
                        >
                            সংরক্ষণ করুন
                        </button>
                    </form>

                    <div className="space-y-3 lg:col-span-6">
                        {glossary.map((g) => (
                            <div
                                key={g.id}
                                className="rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                            >
                                <h3 className="text-sm font-bold text-(--accent-gold)">{g.term}</h3>
                                <p className="text-xs text-(--text-muted)">{g.shortMeaning}</p>
                                <div className="mt-2 flex gap-3 text-xs">
                                    <button
                                        onClick={() => {
                                            setEditingId(g.id);
                                            setForm(g);
                                        }}
                                        className="text-(--accent-emerald) hover:underline"
                                    >
                                        এডিট
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete("glossary", g.id)}
                                            className="text-red-400 hover:underline"
                                        >
                                            ডিলিট
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 6: TEAM & MODERATORS (ADMIN ONLY) */}
            {activeTab === "users" && isAdmin && (
                <div className="grid gap-8 lg:grid-cols-12">
                    <form
                        onSubmit={handleCreateUser}
                        className="space-y-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 lg:col-span-5"
                    >
                        <h2 className="text-lg font-bold text-(--accent-gold)">
                            নতুন Moderator / Admin তৈরি করুন
                        </h2>
                        <input
                            type="text"
                            required
                            placeholder="নাম"
                            value={form.userName || ""}
                            onChange={(e) => setForm({ ...form, userName: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <input
                            type="email"
                            required
                            placeholder="ইমেইল"
                            value={form.userEmail || ""}
                            onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <select
                            value={form.userRole || "moderator"}
                            onChange={(e) => setForm({ ...form, userRole: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        >
                            <option value="moderator">Moderator (লিখতে ও রিভিউ করতে পারবেন)</option>
                            <option value="admin">Admin (সকল ক্ষমতা)</option>
                        </select>
                        <input
                            type="password"
                            required
                            placeholder="পাসওয়ার্ড"
                            value={form.userPassword || ""}
                            onChange={(e) => setForm({ ...form, userPassword: e.target.value })}
                            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) p-2.5 text-sm text-(--text-main)"
                        />
                        <button
                            type="submit"
                            className="rounded-xl border border-[#2E8B57] bg-[#14452F] px-5 py-2.5 text-xs font-semibold text-white"
                        >
                            ইউজার যুক্ত করুন
                        </button>
                    </form>

                    <div className="space-y-3 lg:col-span-7">
                        {users.map((u) => (
                            <div
                                key={u.id}
                                className="flex items-center justify-between rounded-xl border border-(--border-color) bg-(--bg-card) p-4"
                            >
                                <div>
                                    <h3 className="text-sm font-bold text-(--text-main)">
                                        {u.name}{" "}
                                        <span className="ml-2 rounded bg-(--badge-bg) px-2 py-0.5 text-[10px] uppercase text-(--badge-text)">
                                            {u.role}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-(--text-muted)">{u.email}</p>
                                </div>
                                {u.id !== session.id && (
                                    <button
                                        onClick={() => toggleUserStatus(u.id)}
                                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${u.active
                                                ? "border-emerald-700 text-(--accent-emerald)"
                                                : "border-red-800 text-red-400"
                                            }`}
                                    >
                                        {u.active ? "Active (নিষ্ক্রিয় করুন)" : "Disabled (সক্রিয় করুন)"}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}