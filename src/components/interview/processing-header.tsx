"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ProcessingHeader() {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-3">
      <div className="flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interview Session Completed</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-[10px] font-mono text-slate-500">
          Simulated Analysis • Frontend Prototype
        </span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        Your Interview Is Being Analyzed
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
        Our AI is processing your responses, communication patterns, and interview performance to create your personalized feedback report.
      </p>
    </div>
  );
}
