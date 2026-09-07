"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Award } from "lucide-react";

export function ProcessingComplete() {
  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#111827] to-violet-950/80 border border-blue-500/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-400 max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/25">
        <div className="w-full h-full rounded-[22px] bg-[#0b0f19] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Synthesis Complete • 100% Analysis Ready</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Your Performance Report Is Ready
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          We&apos;ve completed your interview analysis and prepared personalized insights to help you improve.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/results"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>View My Results</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
