"use client";

import { useState } from "react";

// নামের প্রথম ও শেষ শব্দের প্রথম অক্ষর বের করার হেল্পার
function getFirstLastInitials(englishName, banglaName) {
  const source = (englishName || banglaName || "SA").trim();
  // ব্র্যাকেট যেমন (রাহিমাহুল্লাহ) বা (হাফিযাহুল্লাহ) বাদ দিয়ে মূল নাম নেওয়া
  const cleanName = source.replace(/\(.*?\)/g, "").trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "MA";
  if (parts.length === 1) {
    return Array.from(parts[0])[0].toUpperCase();
  }

  const firstChar = Array.from(parts[0])[0];
  const lastChar = Array.from(parts[parts.length - 1])[0];
  return `${firstChar}${lastChar}`.toUpperCase();
}

export default function ScholarAvatar({
  image,
  name,
  englishName,
  sizeClass = "h-16 w-16 text-lg",
}) {
  const [imgError, setImgError] = useState(false);
  const initials = getFirstLastInitials(englishName, name);

  if (image && !imgError) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-2xl border-2 border-[#C59B27]/50 bg-(--bg-subtle) shadow-sm ${sizeClass}`}
      >
        <img
          src={image}
          alt={name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-label={name}
      className={`flex shrink-0 items-center justify-center rounded-2xl border border-[#C59B27]/40 bg-linear-to-br from-[#14452F] to-[#0B291C] font-bold tracking-wider text-[#C59B27] shadow-inner select-none ${sizeClass}`}
    >
      {initials}
    </div>
  );
}