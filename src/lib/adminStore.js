"use client";

import { fitnaAlerts as initialAlerts } from "@/data/fitnaData";
import {
    qaData as initialQa,
    booksData as initialBooks,
} from "@/data/extendedContentData";

// ডিফল্ট ইউজার লিস্ট (Admin ও Moderator)
export const DEFAULT_USERS = [
    {
        id: 1,
        name: "Sakib Ahmed (Super Admin)",
        email: "admin@manhajarchive.com",
        password: "admin123",
        role: "admin",
        active: true,
    },
    {
        id: 2,
        name: "Editorial Moderator",
        email: "mod@manhajarchive.com",
        password: "mod123",
        role: "moderator",
        active: true,
    },
];

const INITIAL_GLOSSARY = [
    {
        id: 1,
        term: "হাদ্দাদিয়্যাহ (الحدادية)",
        category: "সমসাময়িক ফিতনা",
        shortMeaning:
            "আকিদা রক্ষার নামে প্রাজ্ঞ সালাফি আলেমদের প্রতি বিদ্বেষ ও চরমপন্থা পোষণকারী দল।",
        detailedExplanation:
            "মাহমূদ আল-হাদ্দাদ নামক ব্যক্তির অনুসারী বা সমমনা উগ্র গোষ্ঠী, যারা সামান্য ইজতিহাদি ভুলের কারণে সমসাময়িক ও পূর্ববর্তী আহলুস সুন্নাহর ইমামদের তুচ্ছ-তাচ্ছিল্য করে, তাঁদের কটাক্ষ করে এবং সাধারণ তরুণদের আলেমদের থেকে বিচ্ছিন্ন করে দেয়।",
        publishStatus: "published",
    },
    {
        id: 2,
        term: "ইজতিহাদ (الاجتهاد)",
        category: "উসূলুল ফিকহ",
        shortMeaning:
            "কুরআন ও সুন্নাহ থেকে শরয়ি বিধান উদ্ভাবনের জন্য যোগ্য মুজতাহিদ আলেমের সর্বোচ্চ প্রচেষ্টা।",
        detailedExplanation:
            "যেসব মাসআলায় সরাসরি সুস্পষ্ট নস (বর্ণনা) নেই অথবা একাধিক ব্যাখ্যার অবকাশ রয়েছে, সেখানে যোগ্য আলেমের গবেষণামূলক সিদ্ধান্তকে ইজতিহাদ বলে। এতে সঠিক হলে দুটি এবং ভুল হলে একটি সওয়াব পাওয়া যায়।",
        publishStatus: "published",
    },
];

const KEYS = {
    SESSION: "ma_admin_session",
    USERS: "ma_admin_users",
    ALERTS: "ma_data_alerts",
    ARTICLES: "ma_data_articles",
    QA: "ma_data_qa",
    BOOKS: "ma_data_books",
    GLOSSARY: "ma_data_glossary",
};

export function getUsers() {
    if (typeof window === "undefined") return DEFAULT_USERS;
    const saved = localStorage.getItem(KEYS.USERS);
    if (!saved) {
        localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
    }
    return JSON.parse(saved);
}

export function saveUsers(users) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function loginUser(email, password) {
    const users = getUsers();
    const found = users.find(
        (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password &&
            u.active
    );
    if (!found) return null;

    const session = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
    };
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
    return session;
}

export function getSession() {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
}

export function logoutUser() {
    localStorage.removeItem(KEYS.SESSION);
}

// কন্টেন্ট লোড ও সেভ হেল্পার (আপনার প্রকৃত ডাটা স্ট্রাকচার অনুযায়ী ম্যাপ করা)
export function loadCollection(type) {
    if (typeof window === "undefined") return [];
    const keyMap = {
        alerts: KEYS.ALERTS,
        articles: KEYS.ARTICLES,
        qa: KEYS.QA,
        books: KEYS.BOOKS,
        glossary: KEYS.GLOSSARY,
    };

    const fallbackMap = {
        alerts: initialAlerts.map((a) => ({ ...a, publishStatus: "published" })),
        articles: [],
        qa: initialQa.map((q) => ({
            ...q,
            answer: q.detailedAnswer || q.shortAnswer || "",
            publishStatus: "published",
        })),
        books: initialBooks.map((b) => ({
            ...b,
            summary: b.description || "",
            pdfUrl: b.pdfUrl || "",
            publishStatus: "published",
        })),
        glossary: INITIAL_GLOSSARY,
    };

    const saved = localStorage.getItem(keyMap[type]);
    if (!saved) {
        localStorage.setItem(keyMap[type], JSON.stringify(fallbackMap[type]));
        return fallbackMap[type];
    }
    return JSON.parse(saved);
}

export function saveCollection(type, items) {
    const keyMap = {
        alerts: KEYS.ALERTS,
        articles: KEYS.ARTICLES,
        qa: KEYS.QA,
        books: KEYS.BOOKS,
        glossary: KEYS.GLOSSARY,
    };
    localStorage.setItem(keyMap[type], JSON.stringify(items));
}