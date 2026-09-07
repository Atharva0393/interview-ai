"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Play } from "lucide-react";

export function HistoryHeader() {
  return (
    <div className="space-y-4 border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-stone-200" />
            <span>Progress Analytics</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-[10px] font-mono text-slate-500">
            Mock Historical Data • Frontend Prototype
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Interview History & Progress
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl leading-relaxed">
          Review your past mock interviews and track how your interview skills are developing over time.
        </p>
      </div>

      <Link
        href="/interview/setup"
        className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Start New Interview</span>
      </Link>
    </div>
  );
}
