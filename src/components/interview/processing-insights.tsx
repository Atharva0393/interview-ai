"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const SIMULATED_INSIGHTS = [
  "Strong technical response patterns detected",
  "Communication clarity is above average",
  "Consistent engagement detected throughout the session",
  "Identifying areas for improvement",
  "Generating personalized recommendations",
];

interface ProcessingInsightsProps {
  visibleCount: number;
}

export function ProcessingInsights({ visibleCount }: ProcessingInsightsProps) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600" />
          Live AI Processing Insights
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Simulated Real-time</span>
      </div>

      <div className="space-y-2.5 min-h-[160px]">
        {SIMULATED_INSIGHTS.slice(0, visibleCount).map((insight, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-800 font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-left-3 duration-300"
          >
            <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
