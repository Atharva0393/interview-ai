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
        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:text-slate-600 border border-slate-800 disabled:border-slate-900 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous Question</span>
      </button>

      {/* Skip & Next Actions */}
      <div className="flex items-center gap-2">
        {!isLast && (
          <button
            onClick={onSkip}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>
        )}

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>{isLast ? "Complete Interview" : "Next Question"}</span>
          {isLast ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
