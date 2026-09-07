"use client";

import React from "react";
import { ChevronLeft, ChevronRight, SkipForward, CheckCircle2 } from "lucide-react";

interface InterviewControlsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onSkip: () => void;
  onNext: () => void;
}

export function InterviewControls({
  currentIndex,
  totalQuestions,
  onPrevious,
  onSkip,
  onNext,
}: InterviewControlsProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      {/* Previous Action */}
      <button
        onClick={onPrevious}
        disabled={isFirst}
        aria-label="Navigate to previous question"
        className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-slate-700 disabled:text-slate-300 border border-stone-200 disabled:border-stone-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-2xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none active:scale-[0.98]"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous Question</span>
      </button>

      {/* Skip & Next Actions */}
      <div className="flex items-center gap-2">
        {!isLast && (
          <button
            onClick={onSkip}
            aria-label="Skip current question"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-slate-500 hover:text-slate-800 border border-stone-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none active:scale-[0.98]"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>
        )}

        <button
          onClick={onNext}
          aria-label={isLast ? "Complete Interview" : "Proceed to next question"}
          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
        >
          <span>{isLast ? "Complete Interview" : "Next Question"}</span>
          {isLast ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
