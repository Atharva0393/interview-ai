"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, History, Award } from "lucide-react";

export function ResultsSummary() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-stone-200" />
            <span>Summary & Action Plan</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            You&apos;re Building Strong Interview Readiness
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Your technical foundation is strong. Continue practicing structured communication and confident delivery to further improve your interview performance.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center shrink-0 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Overall Score
          </span>
          <div className="text-3xl font-extrabold text-slate-900">84%</div>
          <span className="text-[11px] font-bold text-slate-900 block">
            Focus: Confidence & Structure
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-700 text-xs font-bold border border-stone-200 transition-colors shadow-2xs"
        >
          <History className="w-4 h-4 text-slate-900" />
          <span>View Performance History</span>
        </Link>

        <Link
          href="/interview/setup"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </Link>
      </div>
    </div>
  );
}
