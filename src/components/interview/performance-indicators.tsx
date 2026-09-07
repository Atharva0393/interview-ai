"use client";

import React from "react";
import { Award } from "lucide-react";

interface PerformanceIndicatorsProps {
  overallComm: number;
  confidence: number;
  engagement: number;
}

export function PerformanceIndicators({
  overallComm,
  confidence,
  engagement,
}: PerformanceIndicatorsProps) {
  const metrics = [
    { label: "Communication", value: overallComm, color: "bg-violet-600" },
    { label: "Confidence", value: confidence, color: "bg-violet-500" },
    { label: "Engagement", value: engagement, color: "bg-emerald-500" },
  ];

  return (
    <div className="p-4 rounded-2xl bg-white border border-[#e5e3de] space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-violet-600" />
          Live Performance Readiness
        </span>
        <span className="text-[10px] text-slate-400 font-mono">Multimodal Score</span>
      </div>

      <div className="space-y-2.5">
        {metrics.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-700">{item.label}</span>
              <span className="text-slate-900 font-extrabold">{item.value}%</span>
            </div>

            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
