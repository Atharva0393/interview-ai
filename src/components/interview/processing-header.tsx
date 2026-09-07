"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function ProcessingHeader() {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-3">
      <div className="flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Interview Session Completed</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
          Simulated Analysis • Frontend Prototype
        </span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Your Interview Is Being Analyzed
      </h1>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        Our AI is processing your responses, communication patterns, and interview performance to create your personalized feedback report.
      </p>
    </div>
  );
}
