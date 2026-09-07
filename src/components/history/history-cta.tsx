"use client";

import React from "react";
import Link from "next/link";
import { Play, Award, Sparkles, ArrowRight } from "lucide-react";

export function HistoryCTA() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#111827] to-violet-950/50 border border-blue-500/30 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next Action</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Keep Building Your Interview Confidence
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Consistent practice is helping you improve. Start another mock interview and continue tracking your progress.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/results"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Award className="w-4 h-4 text-violet-400" />
          <span>Review Latest Feedback</span>
        </Link>

        <Link
          href="/interview/setup"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start New Mock Interview</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
