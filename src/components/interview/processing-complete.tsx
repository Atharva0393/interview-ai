"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Award } from "lucide-react";

export function ProcessingComplete() {
  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs text-center space-y-6 animate-in zoom-in-95 duration-400 max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 p-0.5 mx-auto flex items-center justify-center text-emerald-600 shadow-2xs">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Synthesis Complete • 100% Analysis Ready</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Performance Report Is Ready
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-lg mx-auto leading-relaxed">
          We&apos;ve completed your interview analysis and prepared personalized insights to help you improve.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/results"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-xs bg-violet-600 hover:bg-violet-700 text-white shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>View My Results</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
