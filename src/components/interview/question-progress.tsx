"use client";

import React from "react";

interface QuestionProgressProps {
  currentIndex: number;
  totalQuestions: number;
}

export function QuestionProgress({
  currentIndex,
  totalQuestions,
}: QuestionProgressProps) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
        <span>Question Progress</span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px]">
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
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? "w-7 bg-slate-900 shadow-2xs"
                  : isCompleted
                  ? "w-2 bg-emerald-600"
                  : "w-2 bg-stone-200 border border-stone-300"
              }`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
