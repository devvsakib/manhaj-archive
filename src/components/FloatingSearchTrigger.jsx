"use client";

import { useState, useRef, useEffect } from "react";
import { Search, GripVertical } from "lucide-react";

export default function FloatingSearchTrigger({ onOpenSearch }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  useEffect(() => {
    const defaultX = window.innerWidth - 76;
    const defaultY = window.innerHeight - 90;
    setPos({ x: Math.max(16, defaultX), y: Math.max(80, defaultY) });
    setInitialized(true);
  }, []);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: pos.x,
      initialY: pos.y,
      hasMoved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      dragRef.current.hasMoved = true;
    }

    const maxX = window.innerWidth - 64;
    const maxY = window.innerHeight - 64;
    const nextX = Math.min(Math.max(12, dragRef.current.initialX + dx), maxX);
    const nextY = Math.min(Math.max(72, dragRef.current.initialY + dy), maxY);

    setPos({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (!dragRef.current.hasMoved) {
      // ট্যাপের পর ব্রাউজারের click ইভেন্ট শেষ হওয়ার জন্য সামান্য ডিলে
      setTimeout(() => {
        if (typeof onOpenSearch === "function") {
          onOpenSearch();
        } else {
          window.dispatchEvent(new Event("open-manhaj-search"));
        }
      }, 60);
    }
  };

  if (!initialized) return null;

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      aria-label="সার্চ করুন (সরাতে ড্র্যাগ করুন)"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      className={`fixed top-0 left-0 z-40 flex h-13 w-13 touch-none items-center justify-center rounded-2xl border border-[#C59B27]/50 bg-[#14452F] text-white shadow-xl backdrop-blur-md transition-shadow select-none md:hidden ${
        isDragging ? "scale-105 cursor-grabbing shadow-2xl" : "cursor-grab"
      }`}
    >
      <GripVertical className="-ml-1 h-3.5 w-3.5 text-[#C59B27]/70" />
      <Search className="h-5 w-5 text-[#C59B27]" />
    </button>
  );
}