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
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          Live AI Processing Insights
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Simulated Real-time</span>
      </div>

      <div className="space-y-2.5 min-h-[160px]">
        {SIMULATED_INSIGHTS.slice(0, visibleCount).map((insight, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-center gap-2.5 animate-in fade-in slide-in-from-left-3 duration-300"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
