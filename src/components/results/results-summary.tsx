"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, History, Award, ArrowRight, ShieldCheck } from "lucide-react";

export function ResultsSummary() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#111827] to-violet-950/50 border border-blue-500/30 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
            <Award className="w-3.5 h-3.5" />
            <span>Summary & Action Plan</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            You&apos;re Building Strong Interview Readiness
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your technical foundation is strong. Continue practicing structured communication and confident delivery to further improve your interview performance.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shrink-0 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Overall Score
          </span>
          <div className="text-3xl font-extrabold text-white">84%</div>
          <span className="text-[11px] font-semibold text-amber-400 block">
            Focus: Confidence & Structure
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <History className="w-4 h-4 text-blue-400" />
          <span>View Performance History</span>
        </Link>

        <Link
          href="/interview/setup"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </Link>
      </div>
    </div>
  );
}
