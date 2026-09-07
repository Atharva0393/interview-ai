"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, Play, CheckCircle2 } from "lucide-react";

export function HistoryHeader() {
  return (
    <div className="space-y-4 border-b border-[#1e293b] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Progress Analytics</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
            Mock Historical Data • Frontend Prototype
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Interview History & Progress
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Review your past mock interviews and track how your interview skills are developing over time.
        </p>
      </div>

      <Link
        href="/interview/setup"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Start New Interview</span>
      </Link>
    </div>
  );
}
