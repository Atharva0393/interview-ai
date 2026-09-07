"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface QuestionProgressProps {
  currentIndex: number;
  totalQuestions: number;
}

export function QuestionProgress({
  currentIndex,
  totalQuestions,
}: QuestionProgressProps) {
  return (
    <div className="p-4 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
        <span>Question Progress</span>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px]">
          {currentIndex + 1} / {totalQuestions} Completed
        </span>
      </div>

      {/* Stepper Dots Track */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? "w-8 bg-gradient-to-r from-blue-500 to-violet-500 shadow-sm shadow-blue-500/50"
                  : isCompleted
                  ? "w-2.5 bg-emerald-500"
                  : "w-2.5 bg-slate-800 border border-slate-700/60"
              }`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
