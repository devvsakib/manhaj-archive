"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export default function AudioLecturePlayer({ title, scholar, duration, audioUrl }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration || 1;
        setProgress((current / total) * 100);
    };

    const handleSeek = (e) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * (audioRef.current.duration || 0);
        audioRef.current.currentTime = newTime;
    };

    return (
        <div className="rounded-xl border border-(--border-color) bg-(--bg-main) p-4">
            <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="flex items-center gap-3.5">
                <button
                    onClick={togglePlay}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2E8B57] bg-[#14452F] text-white transition hover:bg-[#1b593d]"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                </button>

                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2">
                        <h4 className="truncate text-xs font-bold text-(--text-main) md:text-sm">
                            {title}
                        </h4>
                        <span className="shrink-0 text-[11px] text-[#C59B27]">{duration}</span>
                    </div>
                    <p className="mb-2 text-[11px] text-(--text-muted)">{scholar}</p>

                    {/* Seekable Progress Bar */}
                    <div
                        onClick={handleSeek}
                        className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-slate-800"
                    >
                        <div
                            className="h-full bg-[#3CB371] transition-all duration-150"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <Volume2 className="hidden h-4 w-4 shrink-0 text-(--text-muted) sm:block" />
            </div>
        </div>
    );
}