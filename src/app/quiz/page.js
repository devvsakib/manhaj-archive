"use client";

import { useState } from "react";
import { Award, CheckCircle2, XCircle, RotateCcw, BookOpen } from "lucide-react";
import { manhajQuizQuestions } from "@/data/interactiveFeaturesData";

export default function ManhajQuizPage() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (qId, optionIndex) => {
        if (isSubmitted) return;
        setSelectedAnswers({ ...selectedAnswers, [qId]: optionIndex });
    };

    const calculateScore = () => {
        let score = 0;
        manhajQuizQuestions.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctIndex) {
                score += 1;
            }
        });
        return score;
    };

    const handleReset = () => {
        setSelectedAnswers({});
        setIsSubmitted(false);
    };

    const allAnswered =
        Object.keys(selectedAnswers).length === manhajQuizQuestions.length;

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="mb-10 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--pill-border) bg-(--pill-bg) px-4 py-1 text-xs font-medium text-(--accent-gold)">
                    <Award className="h-3.5 w-3.5" />
                    <span>আত্ম-মূল্যায়ন ও জ্ঞান যাচাই</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-[var(--text-main)] md:text-4xl">
                    মানহাজ ও আদব সেলফ-অ্যাসেসমেন্ট কুইজ
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
                    আকিদা, উসূল এবং আলেমদের সাথে আচরণের সালাফি মূলনীতি সম্পর্কে আপনার ধারণা যাচাই করুন। উত্তর জমা দেওয়ার পর প্রতিটি প্রশ্নের দলিলভিত্তিক ব্যাখ্যা দেখতে পাবেন।
                </p>
            </div>

            {/* Score Banner after Submission */}
            {isSubmitted && (
                <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#2E8B57] bg-[#14452F]/30 p-6 sm:flex-row">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)]">
                            আপনার স্কোর: {calculateScore()} / {manhajQuizQuestions.length}
                        </h2>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                            নিচে প্রতিটি প্রশ্নের সঠিক উত্তর এবং কিতাবের রেফারেন্স দেওয়া হলো।
                        </p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#14452F] px-4 py-2.5 text-xs font-semibold text-white border border-[#2E8B57]"
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span>পুনরায় পরীক্ষা দিন</span>
                    </button>
                </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
                {manhajQuizQuestions.map((q, index) => {
                    const userChoice = selectedAnswers[q.id];
                    return (
                        <div
                            key={q.id}
                            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6"
                        >
                            <h3 className="mb-4 text-base font-bold text-[var(--text-main)] md:text-lg">
                                {index + 1}. {q.question}
                            </h3>

                            <div className="space-y-2.5">
                                {q.options.map((opt, optIdx) => {
                                    const isSelected = userChoice === optIdx;
                                    const isCorrect = q.correctIndex === optIdx;

                                    let buttonStyle =
                                        "border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)] hover:border-slate-600";

                                    if (isSubmitted) {
                                        if (isCorrect) {
                                            buttonStyle =
                                                "border-[#3CB371] bg-[#14452F]/50 text-white font-semibold";
                                        } else if (isSelected && !isCorrect) {
                                            buttonStyle =
                                                "border-red-700 bg-red-950/60 text-red-300";
                                        }
                                    } else if (isSelected) {
                                        buttonStyle =
                                            "border-[#C59B27] bg-[#14452F]/30 text-[var(--text-main)] font-semibold";
                                    }

                                    return (
                                        <button
                                            key={optIdx}
                                            onClick={() => handleSelect(q.id, optIdx)}
                                            className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs transition md:text-sm ${buttonStyle}`}
                                        >
                                            <span>{opt}</span>
                                            {isSubmitted && isCorrect && (
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3CB371]" />
                                            )}
                                            {isSubmitted && isSelected && !isCorrect && (
                                                <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {isSubmitted && (
                                <div className="mt-4 rounded-xl border border-[#C59B27]/30 bg-[var(--bg-main)] p-4 text-xs leading-relaxed text-[var(--text-muted)]">
                                    <span className="mb-1 flex items-center gap-1.5 font-bold text-[#C59B27]">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        দলিল ও ব্যাখ্যা:
                                    </span>
                                    {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {!isSubmitted && (
                <div className="mt-8 text-center">
                    <button
                        disabled={!allAnswered}
                        onClick={() => setIsSubmitted(true)}
                        className="rounded-xl bg-[#14452F] px-8 py-3.5 text-sm font-semibold text-white border border-[#2E8B57] transition hover:bg-[#1b593d] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {allAnswered
                            ? "ফলাফল ও দলিল দেখুন"
                            : "সবগুলো প্রশ্নের উত্তর নির্বাচন করুন"}
                    </button>
                </div>
            )}
        </div>
    );
}