"use client";

import { useState, useMemo } from "react";
import { scholarsData } from "@/data/scholarsData";
import ScholarAvatar from "@/components/ScholarAvatar";
import {
  Search,
  BookOpen,
  MapPin,
  Award,
  X,
  Users,
  Sparkles,
} from "lucide-react";

const regions = [
  "সকল অঞ্চল",
  "সৌদি আরব ও হারামাইন",
  "শাম ও হারামাইন",
  "বাংলাদেশ ও উপমহাদেশ",
];

export default function ScholarsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("সকল অঞ্চল");
  const [activeScholar, setActiveScholar] = useState(null);

  const filteredScholars = useMemo(() => {
    return scholarsData.filter((s) => {
      const matchesRegion =
        selectedRegion === "সকল অঞ্চল" || s.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.englishName && s.englishName.toLowerCase().includes(q)) ||
        s.keyFocus.toLowerCase().includes(q) ||
        s.shortBio.toLowerCase().includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
          <Users className="h-3.5 w-3.5" />
          <span>উলামায়ে সালাফ ও সমসাময়িক রাহবার</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-(--text-main) md:text-4xl">
          প্রাজ্ঞ সালাফি আলেমদের পরিচিতি ও অবদান
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-(--text-muted)">
          কুরআন, সহীহ সুন্নাহ এবং সালাফে সালেহীনদের বুঝ অনুযায়ী উম্মাহকে পথপ্রদর্শনকারী নির্ভরযোগ্য ও প্রাজ্ঞ আলেমদের সংক্ষিপ্ত জীবনী ও উল্লেখযোগ্য রচনাবলি।
        </p>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-(--border-color) bg-(--bg-card) p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3.5 h-4 w-4 text-(--text-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শাইখের নাম, বিষয় (তাওহীদ, হাদিস, মানহাজ) লিখে খুঁজুন..."
            className="w-full rounded-xl border border-(--border-color) bg-(--bg-main) py-2.5 pr-4 pl-10 text-sm text-(--text-main) placeholder-(--text-muted) focus:border-(--accent-emerald) focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {regions.map((region) => {
            const active = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-[#3CB371] bg-[#14452F] text-white"
                    : "border-(--border-color) bg-(--bg-main) text-(--text-muted) hover:text-(--text-main)"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scholars Grid */}
      {filteredScholars.length === 0 ? (
        <div className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-12 text-center">
          <p className="text-sm text-(--text-muted)">
            আপনার সার্চের সাথে মিলে এমন কোনো আলেমের তথ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScholars.map((scholar) => (
            <div
              key={scholar.id}
              onClick={() => setActiveScholar(scholar)}
              className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 transition duration-200 hover:-translate-y-0.5 hover:border-(--accent-emerald)/70"
            >
              <div>
                {/* Top Row: Avatar + Name & Role */}
                <div className="mb-4 flex items-start gap-4">
                  <ScholarAvatar
                    image={scholar.image}
                    name={scholar.name}
                    englishName={scholar.englishName}
                    sizeClass="h-16 w-16 text-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 inline-block rounded bg-(--badge-bg) px-2 py-0.5 text-[10px] font-semibold text-(--badge-text)">
                      {scholar.era}
                    </span>
                    <h2 className="text-base font-bold leading-snug text-(--accent-gold) transition group-hover:text-(--accent-emerald)">
                      {scholar.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-(--text-muted)">
                      {scholar.role}
                    </p>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-(--text-muted) md:text-sm">
                  {scholar.shortBio}
                </p>
              </div>

              {/* Footer Tags */}
              <div className="border-t border-(--border-color) pt-3.5">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] text-(--text-muted)">
                  <MapPin className="h-3.5 w-3.5 text-(--accent-emerald)" />
                  <span>{scholar.region}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 font-medium text-(--text-main)">
                    <Sparkles className="h-3.5 w-3.5 text-(--accent-gold)" />
                    {scholar.keyFocus}
                  </span>
                  <span className="font-semibold text-(--accent-emerald) group-hover:underline">
                    বিস্তারিত →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Biography & Books Modal */}
      {activeScholar && (
        <div
          onClick={() => setActiveScholar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 shadow-2xl md:p-8"
          >
            <button
              onClick={() => setActiveScholar(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 rounded-xl border border-(--border-color) bg-(--bg-main) p-2 text-(--text-muted) transition hover:text-(--text-main)"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ScholarAvatar
                image={activeScholar.image}
                name={activeScholar.name}
                englishName={activeScholar.englishName}
                sizeClass="h-20 w-20 text-2xl"
              />
              <div>
                <span className="mb-1.5 inline-block rounded bg-(--badge-bg) px-2.5 py-0.5 text-xs font-semibold text-(--badge-text)">
                  {activeScholar.region} • {activeScholar.era}
                </span>
                <h2 className="text-xl font-bold text-(--accent-gold) md:text-2xl">
                  {activeScholar.name}
                </h2>
                <p className="text-xs text-(--text-muted) md:text-sm">
                  {activeScholar.role}
                </p>
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-(--text-main)">
                <Award className="h-4 w-4 text-(--accent-emerald)" />
                <span>সংক্ষিপ্ত পরিচিতি ও ইলমি অবদান</span>
              </h3>
              <p className="text-xs leading-relaxed text-(--text-muted) md:text-sm">
                {activeScholar.shortBio}
              </p>
            </div>

            {activeScholar.notableWorks?.length > 0 && (
              <div className="rounded-xl border border-(--border-color) bg-(--bg-main) p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-(--accent-gold)">
                  <BookOpen className="h-4 w-4" />
                  <span>উল্লেখযোগ্য কিতাব ও রচনাবলি</span>
                </h3>
                <ul className="space-y-2 text-xs text-(--text-main) md:text-sm">
                  {activeScholar.notableWorks.map((book, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent-emerald)" />
                      <span>{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}