"use client";

import React from "react";
import Link from "next/link";
import { Play, Award, Sparkles, ArrowRight } from "lucide-react";

export function HistoryCTA() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold text-violet-800">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Next Action</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Keep Building Your Interview Confidence
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Consistent practice is helping you improve. Start another mock interview and continue tracking your progress.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/results"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-700 text-xs font-bold border border-stone-200 transition-colors shadow-2xs"
        >
          <Award className="w-4 h-4 text-violet-600" />
          <span>Review Latest Feedback</span>
        </Link>

        <Link
          href="/interview/setup"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start New Mock Interview</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
